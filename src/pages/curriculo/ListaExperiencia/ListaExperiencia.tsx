import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import {
    deleteExperiencia,
    Experiencia,
    getExperiencias,
    updateExperiencia,
} from "../../../services/experienciaService";

import styles from "./ListaExperiencia.module.css";

const ListaExperiencia: React.FC = () => {
    const navigate = useNavigate();

    const [experiencias, setExperiencias] = React.useState<Experiencia[]>([]);

    const fetchExperiencias = async () => {
        try {
            const experiencias = await getExperiencias();
            setExperiencias(experiencias);
        } catch (error) {
            console.log("Erro ao buscar experiências", error);
        }
    };

    useEffect(() => {
        fetchExperiencias();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteExperiencia(id);
            fetchExperiencias();
            alert("Experiência deletada com sucesso!");
        } catch (error) {
            console.log("Erro ao deletar experiência!", error);
            alert("Erro ao deletar experiência!");
        }
    };

    const handleEdit = (experiencia: Experiencia) => {
        navigate("/curriculo/experiencia/cadastro", { state: experiencia });
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th>Ano Início</th>
                    <th>Ano Fim</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {experiencias.map((experiencia, index) => (
                    <tr key={index}>
                        <td>{experiencia.titulo}</td>
                        <td>{experiencia.descricao}</td>
                        <td>{experiencia.tipo}</td>
                        <td>{experiencia.anoInicio}</td>
                        <td>{experiencia.anoFim}</td>
                        <td>
                            <Button onClick={() => handleEdit(experiencia)}>
                                {" "}
                                Editar{" "}
                            </Button>
                            <Button
                                onClick={() => handleDelete(experiencia.id)}
                            >
                                {" "}
                                Deletar{" "}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListaExperiencia;
