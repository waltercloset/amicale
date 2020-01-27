import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styled from "styled-components"

import NavBar from "../components/navbar"
import Infos from "../components/infos"
import Img from "gatsby-image"


const Avatar = styled(Img)`
  width: 100%;
  min-width:300px;
  overflow:hidden;
  margin-left:auto;
  filter: grayscale(100%);
  &:hover{
    filter: none;
    transition: filter 0.5s ease;
  }
`
const Post = styled.div`
    display:flex;
    flex-direction:column;
    flex: 1 1 25%;
    padding: 1em;
    min-width:300px;

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

const Title = styled(Link)`
  color: black;
  font-size: 1.3em;
  font-weight: 500;
  line-height:32.8px;
  text-decoration: none;
`
const Liste = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap: wrap;

  ul{
    list-style:none;
    display:flex;
    justify-content:center;
  }
  li{
    padding: 0.21em
  }
`

const Desc = styled.div`
  margin-top:1em;
  margin-bottom:1em;
`
const Signature = styled.div`
  font-size:50%;
`

const BlogIndex = (props) => {
  const {
    title,
    postPrefix,
  } = props.data.site.siteMetadata;
  const posts = props.data.allWordpressPost.edges;

  return (
    <Layout location={props.location} title={title}>
      <SEO title="All posts" />

      <NavBar/>
      <Liste>
        {posts.map(({ node }) => {
          let imageSource =null;
          if(node.featured_media && node.featured_media.localFile && node.featured_media.localFile.childImageSharp){
            imageSource = node.featured_media.localFile.childImageSharp
            .fluid
          }
          let date = null;
          let oldDate = null;
          if(node.acf.date_de_levenement) {
            date=new Date(node.acf.date_de_levenement);
          } else {
            oldDate=node.wpcf_date+' '+node.date+' '+node.wpcf_heure;
          }


          return (
          <Post key={node.slug}>
            <Infos location= {props.location} date={date} oldDate={oldDate} cats={node.tags} />
            <Link to={node.slug}>
              {imageSource&&<Avatar fluid={imageSource} />}
            </Link>
            <Title to={node.slug} dangerouslySetInnerHTML={{ __html: node.title }} />>

            <Desc dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            <Button to={node.slug}>Lire la suite →</Button>

          </Post>
        )})}
      </Liste>
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
       }
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
          tags {
            name
          }
          acf {
            date_de_levenement
          }
          featured_media {
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
