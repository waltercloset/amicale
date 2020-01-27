import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

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
          padding: `${rhythm(1)} ${rhythm(1)}`,
        }}
      >

        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          {` `}
          | Built by <a href="https://justinwhall.com">Justin W. Hall</a>
        </footer>
      </div>
    )
}

export default Layout
