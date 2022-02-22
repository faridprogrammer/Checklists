import * as React from "react"
import { Link } from "gatsby"
import * as croma from "chroma-js"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  function clickHeader(e) {
    document.body.style.background = croma('white');
  }

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link onClick={clickHeader} to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <h1 className="main-heading">
        <Link onClick={clickHeader} to="/">
          {title}
        </Link>
      </h1>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        <div>
          <Link to="/about">About</Link>
        </div>
      </footer>
    </div>
  )
}

export default Layout
