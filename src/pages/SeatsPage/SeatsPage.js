import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import loading from "../../assets/loading.gif"
import Seats from "./Seats"

export default function SeatsPage() {
    const { idSessao } = useParams()
    const [filme, setFilme] = useState(undefined)
    const [assentos, setAssentos] = useState(undefined)


    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        const promise = axios.get(url)
        promise.then(res => {
            setFilme(res.data)
            console.log(res.data.seats)
            setAssentos(res.data.seats)
        }
        )
        promise.catch(err => console.log(err.response.data))
    }, [])

    if (filme === undefined) {
        return (
            <>
                <TelaCarregando>
                    <img src={loading} />
                </TelaCarregando>
            </>
        )
    }

    function fazerReserva () {
        alert('oi')
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map((a) =>
                 <Seats name={a.name} key={a.name} available={a.isAvailable}/>
                 )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input data-test="client-name" placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input data-test="client-cpf" placeholder="Digite seu CPF..." />

                <button data-test="book-seat-btn" onClick={fazerReserva}>Reservar Assento(s)</button>

            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={filme.movie.posterURL} alt={filme.movie.title} />
                </div>
                <div>
                    <p>{filme.movie.title}</p>
                    <p>{filme.day.weekday} - {filme.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
    div:first-child div{
    border: 1px solid #0E7D71;
    background-color: #1AAE9E; 
}
div:nth-child(2) div{
    border: 1px solid #808F9D;
    background-color: #C3CFD9; 
}
div:nth-child(3) div{
    border: 1px solid #F7C52B;
    background-color: #FBE192; 
}
`
const CaptionCircle = styled.div`
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
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