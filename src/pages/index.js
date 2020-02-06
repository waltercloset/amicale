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

const Avatar = styled(Cimage)`
    margin:auto;

`
const Post = styled.div`
    display:flex;
    flex-direction:column;
    width:320px;
    padding: 10px;
    filter: ${props => props.vieux? 'grayscale(100%)' : 'grayscale(20%)'};
    opacity: ${props => props.vieux? '0.7' : '1'};
    background-color: ${props => props.selected?'yellow':'white'};
    &:hover {
      opacity:1;
      filter: none;
      transition: filter 2s ease;
    }

`
const Button=styled(Link)`
    border: solid 1px black;
    text-transform:uppercase;
    width:auto;
    margin-right:auto;
    color:black;
    text-decoration:none;
    padding: 0.5em;
    cursor:pointer;
    &:hover {
      background-color:green;
    }
    transition: background-color 0.5s ease;
`

const Title = styled.h2`
  text-decoration: none;
    padding-top:${rhythm(1)};

`


const Desc = styled.div`
  margin-top:0;
  margin-bottom:${rhythm(1)};
`
const Signature = styled.div`
  font-size:50%;
`

const Main=styled.div`
  display:flex;
  flex-direction:row;

`

const ContainerCal=styled.div`
  width:350px;
  min-width:350px;
  ${Cal} {
    position: sticky;
    top:0px;
  }
  @media (max-width: 1024px) {
    display:none;
  }
`


const Liste = styled.div`

  width:100%;
  display:flex;
  flex-direction:row;
  flex-wrap: wrap;
  justify-content: flex-start;
  ul{
    list-style:none;
    display:flex;
    justify-content:center;
  }
  li{
    padding: ${rhythm(1)};
  }


`


/* COMPOSANT List affiche une liste (composant stylé Liste) d'événements (date, titre, description, etc.)
props={
  dateSelected : date de l'évenement (une string JJ-MM-YYYY) sélectionné (par exemple dans le calendrier)
  vieux: si les événements de la liste sont tous antérieurs (ou égaux) à la date du jour
  posts: tableau de posts (objets edges récupérés d'une requête GraphQL)
}

*/

const List=props=>{
  const posts=props.posts;
  const dateSelected=props.dateSelected;

  return (
    <Liste >
    {/* on parcourt le tableau des posts passé en props, et on le transforme en tableau de composants Post, qui sera affiché direct*/}
    {posts.map(({ node }, index) => {

      // récupération de la propriété fluid de l'image de présentation du post (à passer au composant Img de gatsby-image)
      let imageSource =null;
      if(node.featured_media && node.featured_media.localFile && node.featured_media.localFile.childImageSharp){
        imageSource = node.featured_media.localFile.childImageSharp
        .fluid
      }

      // récupération de la description du post (description de thème Wordpress lay ou excerpt en cas d'autre thème)
      let content;
      if(node.grid) {
        content=node.lay_project_description
        //content=JSON.parse(node.grid).cont;
        //content=content[content.length-1].cont;
        content=content.replace("line-height:", " ");
      }
      else content=node.excerpt;

      // on vérifie si le post est selectionné, cad correspond à dateSelected
      let selected=false;
      const dateEv=new Date(node.fields.dateEv); //on transforme la date de la requête graphQl en objet Date
      const id=convertToId(dateEv); // on fabrique un id (une string JJ-MM-YYYY avec cette date cf ./utils/dates
      if(id===dateSelected) selected=true;

      return (
      <Post id={id} key={node.slug+{index}} vieux={props.vieux} selected={selected}>
        <Infos location= {props.location} date={node.fields.dateEv} dateFr={node.fields.dateEvFr} cats={node.tags} />
        <Link to={`/${node.slug}`}>
          {imageSource&&<Avatar vieux={props.vieux} fluid={imageSource}
            height={node.featured_media.media_details.height}
            width={node.featured_media.media_details.width}/>}

            <Title dangerouslySetInnerHTML={{ __html: node.title }} />

        </Link>
        <Desc dangerouslySetInnerHTML={{ __html: content }} />
        <Button to={node.slug}>Lire la suite →</Button>
      </Post>
    )})
      }
    </Liste>
  )

}




const BlogIndex = (props) => {
  const [dateSelected, selectDate]=useState('31-12-2000'); // la date sélectionnée peut changer on la met dans un state
  const [state,setState]=useState(false);
  useEffect(() => {
      setState(true);
    });

  const {
    title,
    postPrefix,
  } = props.data.site.siteMetadata;
  const posts = props.data.allWordpressPost.edges;
  const dateActuelle=moment();

  // on fabrique les tableaux des posts (objets de graphql) d'événements à venir et passés (en comparant avec la date du jour)
  const aVenir=[];
  const passes=posts.slice(); // on copie le tableau de tous les posts
  const dates=[]; // on fabrique aussi un tableau avec juste les dates des événements à venir, au format Date (objet JS) pour passer au calendrier
  posts.forEach(({node})=>{
    const dateEv=new Date(node.fields.dateEv);
    if(dateActuelle.isSameOrBefore(moment(node.fields.dateEv), 'days')){// || (dateEv.getDate() === dateActuelle.getDate() && dateEv.getMonth()===dateActuelle.getMonth() && dateEv.getFullYear() === dateActuelle.getFullYear())) {//compareJMA(dateEv, dateActuelle, true)){ // si c'est un événement à venir
       dates.push({dateEv: dateEv, idEv: node.slug}) // on ajoute la date de l'événement au tableau dates ;
       //pour l'instant idEv ne sert pas au calendrier
       if(passes[0].node.slug===node.slug) aVenir.push(passes.shift()); // on enlève du tableau des posts d'événements passés ceux qui sont à venir
    }
  });
  aVenir.reverse(); // le tableau des événements à venir est inversé (prochaine date en premier, etc.)

  const onDateClick=(date)=>{ // quand une date est cliquée dans le calendrier
      const id=convertToId(date);
      selectDate(id); // alors on change le state
  }

  /*
    Layout est un composant qui ajoute le header, le footer, possède les CSS media queries
    NavBar la barre de navigation

    On place le Calendrier dans un container pour le comportement sticky (cf. css)
  */
  return (
    <Layout key={state} location={props.location} title={title}>
      <SEO title="All posts" />

      <NavBar/>
      <Main>

        <List key='liste1' posts={aVenir} dateSelected={dateSelected} location={props.location}/>

        <ContainerCal><Calendrier dates={dates} fermes={[]} onClick={onDateClick} /></ContainerCal>

      </Main>
      <List key='liste2' posts={passes} dateSelected={dateSelected} location={props.location} vieux={true}/>

    </Layout>
  )
}

export default BlogIndex

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
