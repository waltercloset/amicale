import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

const Inf = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    margin-bottom:1em;
    p {
      margin:0;
    }
    text-transform: uppercase;
    font-weight:300;
    color:black;
    .cats{
      font-size:70%;
    }
`

const Infos=(props)=>(
    <Inf>
        <p>{props.date[0]+' '+props.date[1]}{isNaN(props.date[2])?' ':'.'}{props.date[2]}</p>
        <p>–</p>
        <p>{props.date[4]}</p>
        <p className="cats">{props.cats}</p>
    </Inf>
)

export default Infos;