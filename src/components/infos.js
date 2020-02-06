import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import moment from 'moment'
import { rhythm, scale } from "../utils/typography"


const Inf = styled.h3`
    display:flex;
    flex-direction: column;
    justify-content:center;
    margin-bottom: ${rhythm(1)};
    text-transform: uppercase;
    color:black;
    .cats{
      font-size:70%;
    }
    font-weight:400;
`

const Infos=(props)=>{
  const rootPath = `${__PATH_PREFIX__}/`
  let date=[];
  let affDate, affHeure, affDiff, affDateFr;
  const dateActuelle=new Date();
  let vieux=false;
  let annee=null;

  if(props.date && new Date(props.date).getUTCFullYear()<dateActuelle.getUTCFullYear()) {
    annee=<div>{moment(props.date).locale('fr').format('YYYY')}</div>;
  }


  if(props.date && moment(props.date).isBefore(moment(dateActuelle))) vieux=true;
  if(props.date && props.location.pathname === rootPath) {
    //date=props.date.toLocaleDateString('fr-FR', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric', timeZone: "Europe/Paris"}).split(' ')
    affDate=<div>{moment(props.date).locale('fr').format('ddd D MMMM')}</div>;
    affHeure=<div>{moment(props.date).locale('fr').format('H:mm')}</div>
    affDateFr=<div>{props.dateFr}</div>
    affDiff=moment(props.date).fromNow();
  }
  if(props.date && props.location.pathname !== rootPath) {
    //date=props.date.toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', timeZone: "Europe/Paris"}).split(' ')
    affDate=<div>{moment(props.date).locale('fr').format('dddd D MMMM')}</div>;
    affHeure=<div>{moment(props.date).locale('fr').format('H:mm')}</div>
  }

  return (
    <Inf>
        <span style={{display:'flex'}}>{affDate}{annee}</span>
        –
        {affHeure}
        {affDiff}
        {affDateFr}
        <p className="cats">{props.cats && props.cats.map(tag=>(tag.name+' '))}</p>
    </Inf>
)}

export default Infos;