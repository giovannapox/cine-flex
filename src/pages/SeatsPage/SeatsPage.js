import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import loading from "../../assets/loading.gif"
import Seats from "./Seats"

export default function SeatsPage({ infoFilme, setInfoFilme }) {
    const { idSessao } = useParams()
    const navigate = useNavigate()
    const [filme, setFilme] = useState(undefined)
    const [assentos, setAssentos] = useState(undefined)
    const [reserva, setReserva] = useState({ ids: [], name: "", cpf: ""})


    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        const promise = axios.get(url)
        promise.then(res => {
            setFilme(res.data)
            console.log(res.data)
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


    console.log(reserva)
    console.log(infoFilme)


    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map((a) =>
                    <Seats name={a.name} infoFilme={infoFilme} setInfoFilme={setInfoFilme} key={a.name} available={a.isAvailable} setReserva={setReserva} reserva={reserva} id={a.id} />
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={fazerReserva}>
                    <label htmlFor="nome">Nome do Comprador:</label>
                    <input
                        id="nome"
                        data-test="client-name"
                        type="text"
                        placeholder="Digite seu nome..."
                        required
                        value={reserva.name}
                        onChange={e => {
                            setReserva({ ...reserva, name: e.target.value })
                            setInfoFilme({ ...infoFilme, nome: e.target.value })
                        }}
                    />

                    <label htmlFor="cpf">CPF do Comprador:</label>
                    <input
                        id="cpf"
                        data-test="client-cpf"
                        type="number"
                        placeholder="Digite seu CPF..."
                        required
                        value={reserva.cpf}
                        onChange={e => {
                            setReserva({ ...reserva, cpf: e.target.value })
                            setInfoFilme({ ...infoFilme, cpf: e.target.value })
                        }}
                    />

                    <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
                </form>
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
    function fazerReserva(e) {
        e.preventDefault();
        setInfoFilme({ ...infoFilme, titulo: filme.movie.title, data: filme.day.date, hora: filme.name})
        const promise = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", reserva)
        promise.then(() => {
            setReserva({ ids: [], name: "", cpf: "" })
            navigate("/sucesso")
        })
        promise.catch(() => alert("Não foi possivel finalizar a compra, tente novamente mais tarde"))
    }
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
    a{
        text-decoration: none;
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