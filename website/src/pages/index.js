import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import globals from "../globals"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allChecklistsJson.nodes

  globals.resetBackgroundColor(); 

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All" />
        <p>
          No check lists found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All" />
      {posts.map(post => {
        const title = post.title || post.slug;
        post.tags.sort();
        return (
          <Link to={post.slug} itemProp="url" class="checklist-poster">
            <div class="flex-container" style={{ 'margin-bottom': '10px' }}>
              <div className="tag-container">
                {post.tags.map(tag => { return (<div style={{ 'background-color': globals.getTagColor(tag) }} className={`tag`}></div>) })}
              </div>
              <div class="checklist-title">{title}</div>
            </div>
          </Link>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allChecklistsJson(sort: {fields: date, order: DESC}, limit: 1000) {
      nodes {
        description
        id
        date(formatString: "MMMM DD, YYYY")
        tags
        title
        source
        abstract
        slug
      }
    }
  }
`
