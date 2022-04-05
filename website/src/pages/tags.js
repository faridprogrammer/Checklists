import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import globals from "../globals"
// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import tags from "../data/json/tags.json"
import { getTreemap } from "treemap-squarify"

const TagsPage = ({
    data: {
        allChecklistsJson: { group },
        site: {
            siteMetadata: { title },
        },
    },
    location
}) => {
    const chartOptions = {
        data: group.map(tag => {
            return {
                label: tag.fieldValue,
                value: tag.totalCount,
                color: tags[tag.fieldValue]?.color || "red"
            }
        }),
        height: 350,
        width: 700
    };

    const treeMap = getTreemap(chartOptions);
    globals.resetBackgroundColor();

    let staticTitle = "Check lists";
    
    function getXText(rectangle)
    {
        return rectangle.x + (rectangle.width / 2) - (rectangle.data.label.length * 3);
    }

    function getYText(rectangle)
    {
        return rectangle.y + (rectangle.height / 2) ;
    }

    return (
        <Layout location={location} title={staticTitle}>
            <Helmet title={`${staticTitle} | Tags`} />
            <div>
                <h3>Tags</h3>
                <div id="chart" style={{"textAlign": "center"}}>
                    <svg width="700" height="350" >
                        {treeMap.map(mapItem => {
                            return (
                                <g key={`${mapItem.x}:${mapItem.y}`}  fill={mapItem.data.color}>
                                    <rect x={mapItem.x} y={mapItem.y} width={mapItem.width} height={mapItem.height} style={{"stroke-width": 3, "stroke": "rgb(255,255,255)"}}>
                                    </rect>
                                    <text x={getXText(mapItem)} y={getYText(mapItem)} fill="white" style={{"fontSize": "10"}}>
                                        {mapItem.data.label}
                                    </text>
                                </g>
                            );
                        })}
                        Sorry, your browser does not support inline SVG.
                    </svg>
                </div>

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