import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"

import {NavBar} from "../components/navbar"
import Infos from "../components/infos"
import Img from "gatsby-image"
import moment from 'moment'
import {Cimage} from '../components/cimage'

import Calendar from 'react-calendar'
import { rewind } from "react-helmet"
import { navigate } from "@reach/router";

const initdates =   [{dateEv: new Date(Date.parse('1 Jan 2020 GMT')), id:'100'},
{dateEv: new Date(Date.parse('3 Jan 2020 GMT')), id:'100'},
{dateEv: new Date(Date.parse('16 Jan 2020 GMT')), id:'100'}]

export const Cal=styled.div`


    .react-calendar{
        width:350px;
        border:none;
    }

    .react-calendar__month-view__days__day--weekend{
        color: black;
    }

    .ferme {
            background-color: transparent;
            color: black;
            background:
            linear-gradient(to top left,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0) calc(50% - 0.8px),
                rgba(0,0,0,1) 50%,
                rgba(0,0,0,0) calc(50% + 0.8px),
                rgba(0,0,0,0) 100%);

    }
    .react-calendar__month-view__days__day--neighboringMonth,
    .react-calendar__tile:disabled.react-calendar__month-view__days__day--neighboringMonth{
        color:grey;
    }

    .react-calendar__tile--active {
        background-color: white !important;
        a {
            background-color:blueviolet !important;
        }

    }

    .react-calendar__month-view__days{
        padding: 0px;

        button{
            cursor: default !important;
            border-top: solid black 0.5px;
            border-right: solid black 0.5px;
        }


        button:hover{
            background-color:white;
        }

        abbr{
            display:none;
        }

        .encule {
            a{
                height: 41px;
                width: 41px;
                border-radius: 50%;
                background-color: red;
                position: absolute;
                margin-left: -4px;
                margin-top: -20px;
                display:block;
                div {
                    margin-top:25%;
                }

            }

        }

        .encule:hover{

            a:hover
            {
                background-color:blueviolet;
                cursor: pointer !important;

            }

        }

        .rien{
            cursor:default;
            background-color:white !important;
            color:black !important;
        }

        .react-calendar__tile--active,
        .react-calendar__tile--active:hover {
            background: #006edc;
            color: white;
        }
    }
`

const Puce = props =>{
    return <a href={'#'+props.id}><div>{props.children}</div></a>
}


export const Calendrier = ({dates,fermes,onClick}) => {
    if(!dates) dates=initdates;
    if(!fermes) fermes=[];
    const ajoutClasses=({ activeStartDate, date, view })=>{
        console.log(date.toUTCString())
        if(dates.find(event=> event.dateEv.getDate() === date.getDate() && event.dateEv.getMonth() === date.getMonth() &&event.dateEv.getYear() === date.getYear())) return 'encule';
        if(date.getDay()===2) return 'ferme';
        //if(dates.find(dateEv=> dateEv.getDate() === date.getDate() && dateEv.getMonth() === date.getMonth() &&dateEv.getYear() === date.getYear())) return 'ferme'
        return 'rien';
    }

    const desactiver=({ activeStartDate, date, view })=> view==='month' && !dates.find(event=> event.dateEv.getDate() === date.getDate() && event.dateEv.getMonth() === date.getMonth() &&event.dateEv.getYear() === date.getYear());

    const placerPuces =({date, view})=>{

        if(dates.find(event=> event.dateEv.getDate() === date.getDate() && event.dateEv.getMonth() === date.getMonth() &&event.dateEv.getYear() === date.getYear())){
            return <Puce id={date.getDate()+'-'+date.getMonth()}>{date.getDate()}</Puce>
        }
        return <div>{date.getDate()}</div>
    }

    return (
    <Cal>
        <Calendar onClickDay={onClick} calendarType='US' tileDisabled={desactiver} tileContent={placerPuces} tileClassName={ajoutClasses}/>
    </Cal>

    )
}

