import React, {useRef} from 'react';
import {useFormik} from "formik";
import emailjs from '@emailjs/browser';

type FormikErrorType = {
    text?: string
    email?: string
    message?: string
}

export const News = () => {

        const form = useRef()

        const sendEmail = (e: any) => {
            e.preventDefault();

            emailjs.sendForm('service_gkdmx7e', 'template_n9ma8ih', form.current as any, 'lYhy7Kc3une2x20rk')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        };


        const formik = useFormik({
            initialValues: {
                fullName: '',
                email: '',
                subject: '',
                text: ''

            },
            validate: (values) => {
                // const errors: FormikErrorType = {}
                // if (!values.text) {
                //     errors.text = 'Required'
                // }
                // if (!values.text.length) {
                //     errors.text = 'Field cannot be empty'
                // }
                // return errors
            }, onSubmit: values => {
                formik.resetForm()
            }
        })
        return (

            <form onSubmit={sendEmail}>
                <div>
                    <input
                        placeholder={'input fullName...'}
                        {...formik.getFieldProps('fullName')}
                    />
                    {/*{formik.errors.text && <div style={{color: 'red'}}>sorry, but field can't be empty</div>}*/}
                    <input
                        placeholder={'input email...'}
                        {...formik.getFieldProps('email')}
                    />
                    <input
                        placeholder={'input subject...'}
                        {...formik.getFieldProps('subject')}
                    />
                    <input
                        placeholder={'input text...'}
                        {...formik.getFieldProps('text')}
                    />
                    <button disabled={!!formik.errors.text} type={'submit'}>send</button>
                </div>
            </form>
        );
    };


