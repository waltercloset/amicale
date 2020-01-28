import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Moment from 'react-moment';
import '../../node_modules/moment/locale/fr'
import moment from 'moment'
import { rhythm, scale } from "../utils/typography"
import Img from "gatsby-image"

const Image=styled.div`
  position:relative;
  height:${props=>props.height};
  overflow:hidden;
  margin-left:auto;
  width:300px;

`
const Pic=styled(Img)`
  && {position: absolute;}
  object-fit: cover;
  width: 300px;
`
const BASELINE=25.6;

export const Cimage =(props) => {
    let height=(props.height / props.width)*300;
    const reste=height % BASELINE;
    const ajout= BASELINE - reste;
    height+=ajout;
    return (
        <Image height={height+'px'}>
            <Pic fluid={props.fluid} style={{position: 'absolute'}}/>
        </Image>

    )
}