import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.checklistsJson
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data


  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.title}
        description={post.description}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.date}</p>
        </header>
        <section class="checkboxes">
          {
            post.items.map((itemTxt) => {
              return (
                <label class="checkbox-container">{itemTxt}
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              )
            })
          }
          {JSON.stringify()}
        </section>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    checklistsJson(id: { eq: $id }) {
      id
      title
      date(formatString: "MMMM DD, YYYY")
      description
      source
      items
      tags
    }
    previous: checklistsJson(id: { eq: $previousPostId }) {
      slug
      title
    }
    next: checklistsJson(id: { eq: $nextPostId }) {
      slug
      title
    }
  }
`
