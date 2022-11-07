import React, {lazy, Suspense, useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import {useDispatch} from "react-redux";
import {getPrifileDataThunk, getStatus} from "./redux/profile-reducer";
import {initializedThunk} from "./redux/app.Reducer";
import {useAppSelector} from "./redux/hooks";
import {Preloader} from "./components/common/preloader/Preloader";
import {loginUserThunk} from "./redux/header-reducer";
import {Header} from "./components/Header/Header";


const Dialogs = lazy(() =>
    import('./components/Dialogs/Dialogs')
        .then(({Dialogs}) => ({default: Dialogs})),
);

const Profile = lazy(() =>
    import('./components/Prifile/Profile')
        .then(({Profile}) => ({default: Profile})),
);

const Login = lazy(() =>
    import('./components/Login/Login')
        .then(({Login}) => ({default: Login})),
);

function App() {

    const style = {color: 'red'}

    let userId = useParams<'id'>()
    let id = userId.id
    if (!id) {
        id = (24872).toString()
    }
    console.log(id)
    const dispatch = useDispatch()
    const initialized = useAppSelector(state => state.app.initialized)


    useEffect(() => {
        // @ts-ignore
        dispatch(loginUserThunk())
        // @ts-ignore
        dispatch(getPrifileDataThunk(id))
        // @ts-ignore
        dispatch(getStatus(id))
        // @ts-ignore
        dispatch(initializedThunk())
    }, [])

    if (!initialized) {
        return <Preloader/>
    }


    return (
        <div className="app-wrapper">
            <Header id={id}/>
            <div className={"app-wrapper-content"}>
                <Suspense fallback={<Preloader/>}>
                <Routes>
                    <Route path={'404'} element={<div style={style}>404 :( not found</div>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                    <Route path={'/messages'} element={<Dialogs/>}/>
                    <Route path={'/profile/:id'} element={<Profile isOwner={!!id}/>}/>
                    <Route path={'/users'} element={<UsersContainer/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default App;



