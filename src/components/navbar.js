import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { rhythm, scale } from "../utils/typography"

const ElementMenu = styled(Link)`
  text-decoration:none;
  color: black;
  &:hover{
    cursor: pointer;
  }
`
const Menu = styled.div`
  display: flex;
  align-self: left;
`

export const Bar = styled.h2`
  position: relative;
  top: 0px;
  background-color: rgba(255,255,255,0.7);
  z-index:10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  padding-top:${rhythm(0.4)};;
  padding-bottom:${rhythm(1)};;


`
const Title=styled(Link)`
  text-decoration:none;
  color:black;

`

export const NavBar =()=> (
  <Bar>
    <Title to="/">L'Amicale, 31 rue Sébastien Gryphe Lyon 7e</Title>
    <Menu>
      <ElementMenu to="/agenda">Calendrier</ElementMenu>/
      <ElementMenu>Infos</ElementMenu>/
      <ElementMenu>Contact</ElementMenu>
    </Menu>
  </Bar>
)

