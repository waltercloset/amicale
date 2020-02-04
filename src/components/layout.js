import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import { rhythm, scale } from "../utils/typography"
import {Bar} from './navbar'

const Main=styled.main`

    ${Bar} {
      font-size: ${rhythm(1.1)};
      height: 50px;

      @media (max-width: 1024px) {
        font-size: ${rhythm(0.9)};
      }
      @media (max-width: 800px) {
        flex-direction: column;
        font-size: ${rhythm(0.8)};
        height: 80px;
      }
      @media (max-width: 460px) {
        flex-direction: column;
        font-size: ${rhythm(0.8)};
        height: 80px;
      }
  }
`

const Layout = (props) => {
    const { location, title, children } = props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (<div></div>);

    } else {
      header = (
        <div>
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
        <div
        style={{
          ...scale(-0.2),
          marginBottom: rhythm(1.5),
          marginTop: 0,
          color: '#666',
        }}
        >
          With ❤ for Netlify
        </div>
        </div>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(100),
          padding: `${rhythm(1)} ${rhythm(0)}`,
        }}
      >

        <header>{header}</header>
        <Main>{children}</Main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          {` `}
          | Built by L'amicale
        </footer>
      </div>
    )
}

export default Layout
