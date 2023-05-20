import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/common/Button";
import {
    updatePortfolio,
    Portfolio,
    getPortfolios,
    deletePortfolio,
} from "../../../services/portfolioService";

import styles from "./ListaPortfolio.module.css";

const ListaPortfolio: React.FC = () => {
    const navigate = useNavigate();

    const [portfolio, setPortfolio] = React.useState<Portfolio[]>([]);

    const fetchPortfolio = async () => {
        try {
            const portfolio = await getPortfolios();
            setPortfolio(portfolio);
        } catch (error) {
            console.log("Erro ao buscar portfolio", error);
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deletePortfolio(id);
            fetchPortfolio();
            alert("Portfolio deletado com sucesso!");
        } catch (error) {
            console.log("Erro ao deletar portfolio!", error);
            alert("Erro ao deletar portfolio!");
        }
    };

    const handleEdit = (portfolio: Portfolio) => {
        navigate("/portfolio/cadastro", { state: portfolio });
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Imagem</th>
                    <th>Link</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {portfolio.map((itemPortfolio, index) => (
                    <tr key={index}>
                        <td>{itemPortfolio.title}</td>
                        <td>
                            <img
                                src={itemPortfolio.image}
                                alt={itemPortfolio.title}
                            />
                        </td>
                        <td>
                            <a
                                href={itemPortfolio.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {itemPortfolio.link}
                            </a>
                        </td>
                        <td>
                            <Button onClick={() => handleEdit(itemPortfolio)}>
                                Editar
                            </Button>
                            <Button
                                onClick={() => handleDelete(itemPortfolio.id)}
                            >
                                Excluir
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListaPortfolio;
