import React, { useEffect, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "./CadastrarInformacoes.module.css";
import Input from "../../../components/forms/Input";
import Textarea from "../../../components/forms/Textarea";
import {
    Informacoes,
    updateInformacoes,
    getInformacoes,
} from "../../../services/informacoesService";
import InformacoesCard from "./InformacoesCard";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";

const CadastrarInformacoes: React.FC = () => {
    const [informacoes, setInformacoes] = useState<Informacoes>(
        {} as Informacoes
    );

    const initialValues: Informacoes = {
        id: 1,
        foto: "",
        nome: "",
        cargo: "",
        resumo: "",
    };

    const validationSchema = Yup.object().shape({
        foto: Yup.string().required("Campo obrigatório"),
        nome: Yup.string().required("Campo obrigatório"),
        cargo: Yup.string().required("Campo obrigatório"),
        resumo: Yup.string().required("Campo obrigatório"),
    });

    const fetchInformacao = async () => {
        try {
            const informacao = await getInformacoes();
            setInformacoes(informacao);
        } catch (error) {
            console.error("Erro ao buscar informações:", error);
        }
    };

    useEffect(() => {
        fetchInformacao();
    }, []);

    const onSubmit = async (
        values: Informacoes,
        { resetForm }: { resetForm: () => void }
    ) => {
        try {
            await updateInformacoes(values);
            setInformacoes(values);
            console.log(values);
            resetForm();
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
            alert("Ocorreru um erro ao enviar o formulário. Tente novamente.");
        }
    };

    const handleDelete = async () => {
        try {
            await updateInformacoes(initialValues);
            setInformacoes(initialValues);
            alert("Informações deletadas com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar informações:", error);
            alert(
                "Ocorreu um erro ao deletar as informações. Tente novamente."
            );
        }
    };

    return (
        <div className={styles.formWrapper}>
            <Formik
                initialValues={informacoes}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form action="" className={styles.form}>
                        <Title>Informações Pessoais</Title>

                        <Input
                            label="Foto"
                            name="foto"
                            errors={errors.foto}
                            touched={touched.foto}
                        />

                        <Input
                            label="Nome"
                            name="nome"
                            errors={errors.nome}
                            touched={touched.nome}
                        />

                        <Input
                            label="Cargo"
                            name="cargo"
                            errors={errors.cargo}
                            touched={touched.cargo}
                        />

                        <Textarea
                            label="Resumo"
                            name="resumo"
                            errors={errors.resumo}
                            touched={touched.resumo}
                        />

                        <Button type="submit">Salvar</Button>
                    </Form>
                )}
            </Formik>

            {informacoes &&
                Object.entries(informacoes).some(
                    ([key, value]) => key !== "id" && value.trim() !== ""
                ) && (
                    <div className={styles.cardContainer}>
                        <InformacoesCard informacoes={informacoes} />
                        <Button onClick={handleDelete} red>
                            Deletar
                        </Button>
                    </div>
                )}
        </div>
    );
};

export default CadastrarInformacoes;
