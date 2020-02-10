import React from "react"
import {useState, useEffect} from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"

import {NavBar} from "../components/navbar"
import Infos from "../components/infos"
import {Cimage} from '../components/cimage'
import {Cal, Calendrier} from '../components/calendrier'
import { compareJMA, convertToId } from "../utils/dates"
import moment from 'moment'


const Evenement=styled.div`

    margin: 1em;

`

const Mois=styled.div`
    text-transform: uppercase;
    margin: 2em;

`

const Event=({event})=>(
  <Evenement>
    <Link to={event.slug} dangerouslySetInnerHTML={{ __html: event.title }} />
  </Evenement>
)



const Agenda = props =>{
    moment.locale('fr');
    moment.tz.setDefault("Europe/Paris");

    const posts = props.data.allWordpressPost.edges;
    const dates=[];
    let m=moment();
    posts.forEach(({node})=>{

        if(node.fields.dateEv) m=moment(node.fields.dateEv).locale('fr');
        if(!dates[dates.length-1] || dates[dates.length-1].month!==m.format("MMMM YYYY"))
            dates.push({month: m.format("MMMM YYYY"), events: []})
        dates[dates.length-1].events.push(node);
    });
    return (
        <div>
            {dates.map(date=>(
                <div>
                    <Mois>{date.month}</Mois>
                    {date.events.map(node=><Event event={node}/>)}
                </div>))}
        </div>

    );
}

export default Agenda;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        postPrefix
      }
    }
    allWordpressPost(
       filter: {
         fields: {
           deploy: {eq: true}
         }
       },
       sort: { fields: [fields___dateEv], order: DESC },
       limit: 100
      ) {
      edges {
        node {
          title
          excerpt
          slug
          date(formatString: "YYYY")
          wpcf_date
          wpcf_heure
          wpcf_type
          grid
          lay_project_description
          fields {
            dateEv(locale: "fr")
            dateEvFr: dateEv(locale :"fr", formatString: "ddd D MMMM YYYY")
          }
          tags {
            name
          }
          acf {
            date_de_levenement
          }
          featured_media {
            media_details {
              height
              width
            }
            localFile {

                childImageSharp {
                  # Try editing the "width" and "height" values.
                  fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }

            }
          }
        }
      }
    }
  }
`