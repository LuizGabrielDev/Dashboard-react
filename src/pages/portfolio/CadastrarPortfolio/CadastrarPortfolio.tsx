import React from "react";

import styles from "./CadastrarPortfolio.module.css";

import * as Yup from "yup";
// import { Formik, Form } from "formik";
import Input from "../../../components/forms/Input";
import {
    Portfolio,
    createOrUpdatePortfolio,
} from "../../../services/portfolioService";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../../../components/forms/Form";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";

const CadastrarPortfolio = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const portfolio = location.state as Portfolio;

    const initialValues: Portfolio = {
        id: 0,
        link: "",
        image: "",
        title: "",
    };

    const validationSchema = Yup.object().shape({
        id: Yup.number(),
        link: Yup.string().required("Campo obrigatório"),
        image: Yup.string().required("Campo obrigatório"),
        title: Yup.string().required("Campo obrigatório"),
    });

    const onSubmit = async (
        values: Portfolio,
        { resetForm }: { resetForm: () => void }
    ) => {
        try {
            await createOrUpdatePortfolio(values);
            console.log(values);
            resetForm();
            navigate("/portfolio/lista");
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Erro ao enviar formulário!");
        }
    };

    return (
        <div className={styles.formWrapper}>
            <Form
                initialValues={portfolio || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>
                        <Title>Cadastro de Portfólio</Title>

                        <Input
                            label="Link"
                            name="link"
                            errors={errors.link}
                            touched={touched.link}
                        />

                        <Input
                            label="Imagem"
                            name="image"
                            errors={errors.image}
                            touched={touched.image}
                        />

                        <Input
                            label="Título"
                            name="title"
                            errors={errors.title}
                            touched={touched.title}
                        />

                        <Button type="submit">Enviar</Button>
                    </>
                )}
            </Form>
        </div>
    );
};

export default CadastrarPortfolio;
