import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allChecklistsJson.nodes

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
  function getTagClass(tag) {
    if (tag === 'travel') {
      return 'bg-yellow';
    }
    if (tag === 'easy') {
      return 'bg-green';
    }
    if (tag === 'hard') {
      return 'bg-red';
    }
    if (tag === 'development') {
      return 'bg-blue';
    }
    if (tag === 'project') {
      return 'yellow';
    }
    if (tag === 'management') {
      return 'bg-red';

    }
  }
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All" />
      <Seo title="All" />
      {posts.map(post => {
        const title = post.title || post.slug
        return (
          <Link to={post.slug} itemProp="url">
            <div class="flex-container">
              <div class="checklist-title">{title}</div>
              {post.tags.map(tag => { return (<div className={`tag ${getTagClass(tag)}`}></div>) })}
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
