import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react";

export default function HomePage() {

    const [poster, setPoster] = useState([]);

    useEffect(() => {
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
        const promise = axios.get(url);

        promise.then((res) => {
            setPoster(res.data)
            console.log(res.data)
        });
        promise.catch((err) => { console.log(err.response.data) });
    }, [])

    if (poster.length === 0) {
        return (
            <>
                <TelaCarregando>
                    <img src="https://cdn.dribbble.com/users/712682/screenshots/11956378/media/50c8e606db69f492200555d72b34f308.gif" />
                </TelaCarregando>
            </>
        )
    }



    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {poster.map((p) => (
                    <MovieContainer key={p.id}>
                        <img src={p.posterURL} alt={p.title} />
                    </MovieContainer>
                ))}
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
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