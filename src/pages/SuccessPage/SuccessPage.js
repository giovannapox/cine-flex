import styled from "styled-components"
import { Link } from "react-router-dom"
import loading from "../../assets/loading.gif"

export default function SuccessPage({ infoFilme }) {

    if (infoFilme === []) {
        return (
            <>
                <TelaCarregando>
                    <img src={loading} />
                </TelaCarregando>
            </>
        )
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{infoFilme.titulo}</p>
                <p>{infoFilme.data} - {infoFilme.hora}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {infoFilme.lugares.map((l) => <p key={l}>Assento {l}</p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {infoFilme.nome}</p>
                <p>CPF: {infoFilme.cpf}</p>
            </TextContainer>

            <Link data-test="go-home-btn" to={`/`}>
                <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`
const TelaCarregando = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 400px;
        height: 400px;
    }
`