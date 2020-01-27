import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

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

const NavBar = styled.nav`
  font-size:1.3em;
  position: sticky;
  top: 0px;
  background-color: rgba(255,255,255,0.7);
  z-index:10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  padding-top:5px;
  padding-bottom: 5px;

`
const Title=styled(Link)`
  text-decoration:none;
  color:black;

`

const Bar =()=> (
  <NavBar>
    <Title to="/">L'Amicale, 31 rue Sébastien Gryphe Lyon 7e</Title>
    <Menu>
      <ElementMenu to="/calendar">Calendrier</ElementMenu>/
      <ElementMenu>Infos</ElementMenu>/
      <ElementMenu>Contact</ElementMenu>
    </Menu>
  </NavBar>
)

export default Bar;