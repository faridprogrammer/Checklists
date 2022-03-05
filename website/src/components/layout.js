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
      <footer style={{ textAlign: 'center' }} className="small-txt">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        <div>
          <Link className="small-txt" to="/about">About</Link>
          {` `}|{` `}
          <Link className="small-txt" to="/tags">Tags</Link>
        </div>
      </footer>
    </div>
  )
}

export default Layout
