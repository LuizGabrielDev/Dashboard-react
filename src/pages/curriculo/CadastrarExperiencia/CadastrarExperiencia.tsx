import React from "react";

import styles from "./CadastrarExperiencia.module.css";

import * as Yup from "yup";
// import { Formik } from "formik";
// import { Form as FormFormik } from "formik";
import Input from "../../../components/forms/Input";
import Textarea from "../../../components/forms/Textarea";
import Select from "../../../components/forms/Select";
import {
    createOrUpdateExperiencia,
    Experiencia,
} from "../../../services/experienciaService";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../../../components/forms/Form";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";

const CadastrarExperiencia: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const experiencia = location.state as Experiencia;

    const initialValues: Experiencia = {
        id: 0,
        titulo: "",
        descricao: "",
        tipo: "",
        anoInicio: 2022,
        anoFim: 2023,
    };

    const validationSchema = Yup.object().shape({
        id: Yup.number(),
        titulo: Yup.string().required("Campo obrigatório"),
        descricao: Yup.string(),
        tipo: Yup.string().required("Campo obrigatório"),
        anoInicio: Yup.number()
            .required("Campo obrigatório")
            .typeError("Um número é obrigatório"),
        anoFim: Yup.number()
            .required("Campo obrigatório")
            .typeError("Um número é obrigatório"),
    });

    const onSubmit = async (
        values: Experiencia,
        { resetForm }: { resetForm: () => void }
    ) => {
        try {
            await createOrUpdateExperiencia(values);
            console.log(values);
            resetForm();
            navigate("/curriculo/experiencia/lista");
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Erro ao enviar formulário!");
        }
    };

    return (
        <div className={styles.formWrapper}>
            <Form
                initialValues={experiencia || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>
                        <Title>Cadastrar Experiência</Title>

                        <Input
                            label="Título"
                            name="titulo"
                            errors={errors.titulo}
                            touched={touched.titulo}
                        />

                        <Input
                            label="Ano Início"
                            name="anoInicio"
                            errors={errors.anoInicio}
                            touched={touched.anoInicio}
                        />

                        <Input
                            label="Ano Fim"
                            name="anoFim"
                            errors={errors.anoFim}
                            touched={touched.anoFim}
                        />

                        <Select
                            label="Tipo"
                            name="tipo"
                            options={[
                                {
                                    value: "profissional",
                                    label: "Profissional",
                                },
                                { value: "academico", label: "Acadêmico" },
                            ]}
                            errors={errors.tipo}
                            touched={touched.tipo}
                        ></Select>

                        <Textarea
                            label="Descrição"
                            name="descricao"
                            errors={errors.descricao}
                            touched={touched.descricao}
                        />

                        <Button type="submit">Salvar</Button>
                    </>
                )}
            </Form>
        </div>
    );
};

export default CadastrarExperiencia;
