import { useState } from "react"
import styled from "styled-components"

export default function Seats({ name, available, setReserva, id, reserva, setInfoFilme, infoFilme }) {
    const [selecionado, setSelecionado] = useState(false)

    function selecionarAssento(id) {
        if (available === false) {
            return alert("Esse assento não está disponível")
        }
        if (selecionado === true) {
            setSelecionado(false)
        } else {
            setSelecionado(true)
            setInfoFilme({ ...infoFilme, lugares: [...infoFilme.lugares, name] })
            setReserva({ ...reserva, ids: [...reserva.ids, id]})
        }
    }


    return (
        <>
            <SeatItem data-test="seat" onClick={() => selecionarAssento(id)} selecionado={selecionado} available={available} setReserva={setReserva}>{name}</SeatItem>
        </>
    )
}

const SeatItem = styled.div`
    border: 1px solid ${props => props.available === false ? "#F7C52B" : props.selecionado === true ? "#0E7D71" : "#808F9D"};         
    background-color: ${props => props.available === false ? "#FBE192" : props.selecionado === true ? "#1AAE9E" : "#C3CFD9"};  
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`