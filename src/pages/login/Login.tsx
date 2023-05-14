// import { Formik, Form } from "formik";
import React from "react";

import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import styles from "./Login.module.css";

import Input from "../../components/forms/Input";
import { login as loginService } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

import Form from "../../components/forms/Form";
import Button from "../../components/common/Button";
import Title from "../../components/common/Title";

interface LoginValues {
    email: string;
    password: string;
}

const initialValues: LoginValues = {
    email: "",
    password: "",
};

const validationSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
});

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (values: LoginValues) => {
        try {
            const user = await loginService(values.email, values.password);
            login(user);
            navigate("/");
            console.log(values);
        } catch (error) {
            console.log(error);
            alert("Erro ao realizar login");
        }
    };

    return (
        <div className={styles.loginWrapper}>
            {/* <div className={styles.formWrapper}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className={styles.form}>
                            <h1 className={styles.title}>MEU SITE PESSOAL</h1>

                            <Input
                                label="E-mail"
                                name="email"
                                type="email"
                                errors={errors.email}
                                touched={touched.email}
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                errors={errors.password}
                                touched={touched.password}
                            />
                            <button type="submit" className={styles.button}>
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div> */}

            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>
                        <Title>MEU SITE PESSOAL</Title>

                        <Input
                            label="E-mail"
                            name="email"
                            type="email"
                            errors={errors.email}
                            touched={touched.email}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            errors={errors.password}
                            touched={touched.password}
                        />

                        <Button type="submit">Login</Button>
                    </>
                )}
            </Form>
        </div>
    );
};

export default Login;
