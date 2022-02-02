import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import globals from "../globals"
// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

const TagsPage = ({
    data: {
        allChecklistsJson: { group },
        site: {
            siteMetadata: { title },
        },
    },
    location
}) => {
    globals.resetBackgroundColor(); 
    let staticTitle = "Check lists";
    return (
        <Layout location={location} title={staticTitle}>
            <Helmet title={staticTitle} />
            <div>
                <h3>Tags</h3>
                <ul>
                    {group.map(tag => (
                        <li key={tag.fieldValue}>
                            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                                {tag.fieldValue} ({tag.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

TagsPage.propTypes = {
    data: PropTypes.shape({
        allChecklistsJson: PropTypes.shape({
            group: PropTypes.arrayOf(
                PropTypes.shape({
                    fieldValue: PropTypes.string.isRequired,
                    totalCount: PropTypes.number.isRequired,
                }).isRequired
            ),
        }),
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                title: PropTypes.string.isRequired,
            }),
        }),
    }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allChecklistsJson(limit: 2000) {
        group(field: tags) {
            fieldValue
            totalCount
          }
    }
  }
`