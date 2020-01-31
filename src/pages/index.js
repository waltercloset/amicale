import React from "react"
import {useState} from "react"
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
import {Cal, Calendrier} from '../components/calendrier'


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
const Liste = styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  flex-wrap: wrap;
  justify-content: center;
  ul{
    list-style:none;
    display:flex;
    justify-content:center;
  }
  li{
    padding: ${rhythm(1)};
  }
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
    position: fixed;
  }
`



const BlogIndex = (props) => {
  const [dateSelected, selectDate]=useState(new Date());
  const {
    title,
    postPrefix,
  } = props.data.site.siteMetadata;
  const posts = props.data.allWordpressPost.edges;
  const dateActuelle=new Date();

  const dates=[];
  posts.forEach(({node})=>{
    if(new Date(node.fields.dateEv)>dateActuelle) dates.push({dateEv: new Date(node.fields.dateEv), idEv: node.slug})
  });
  console.log(dates);

  const onDateClick=(date)=>{
      const id=date.getDate()+'-'+date.getMonth();
      selectDate(id);
  }

  return (
    <Layout location={props.location} title={title}>
      <SEO title="All posts" />

      <NavBar/>
      <Main>
        <Liste>
          {posts.map(({ node }) => {
            let imageSource =null;
            let vieux=false;

            if(node.featured_media && node.featured_media.localFile && node.featured_media.localFile.childImageSharp){
              imageSource = node.featured_media.localFile.childImageSharp
              .fluid
            }
            if(node.fields.dateEv && moment(node.fields.dateEv).isBefore(moment(dateActuelle))) vieux=true;
            let content;
            if(node.grid) {
              content=node.lay_project_description
              //content=JSON.parse(node.grid).cont;
              //content=content[content.length-1].cont;
              content=content.replace("line-height:", " ");
            }
            else content=node.excerpt;
            let selected=false;
            let id=new Date(node.fields.dateEv).getDate()+'-'+new Date(node.fields.dateEv).getMonth();
            if(id===dateSelected) selected=true;
            return (

            <Post id={id} key={node.slug} vieux={vieux} selected={selected}>
              <Infos location= {props.location} date={node.fields.dateEv} cats={node.tags} />
              <Link to={node.slug}>
                {imageSource&&<Avatar vieux={vieux} fluid={imageSource}
                  height={node.featured_media.media_details.height}
                  width={node.featured_media.media_details.width}/>}
                  <Title dangerouslySetInnerHTML={{ __html: node.title }} />

              </Link>
              <Desc dangerouslySetInnerHTML={{ __html: content }} />
              <Button to={node.slug}>Lire la suite →</Button>

            </Post>
          )})}
        </Liste>

        <ContainerCal><Calendrier dates={dates} fermes={[]} onClick={onDateClick} /></ContainerCal>

      </Main>
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
            dateEv
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
