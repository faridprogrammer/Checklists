const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for check lists
  const checklistPost = path.resolve(`./src/templates/checklist-post.js`)
  const tagTemplate = path.resolve("src/templates/tags.js")

  // Get all json checklists sorted by date
  const result = await graphql(
    `
      {
        allChecklistsJson(sort: {fields: date, order: DESC}, limit: 1000) {
          nodes {
            description
            id
            date
            tags
            title
            author{
              name
              twitter
              email
            }
            items
            source
            abstract
            slug
          }
        }
        tagsGroup: allChecklistsJson {
          group(field: tags) {
            fieldValue
          }
        }      
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your check lists`,
      result.errors
    )
    return
  }

  const posts = result.data.allChecklistsJson.nodes

  // Create check lists pages
  // But only if there's at least one markdown file found at "data/checklists" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.slug,
        component: checklistPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

   // Extract tag data from query
   const tags = result.data.tagsGroup.group
   // Make tag pages
   tags.forEach(tag => {
     createPage({
       path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
       component: tagTemplate,
       context: {
         tag: tag.fieldValue,
       },
     })
   })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `ChecklistsJson`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "ChecklistsJson" queries will return `null` even when no
  // Check lists are stored inside "data/checklists" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
      twitter: String
    }

    type Social {
      twitter: String
    }

    type ChecklistsJson implements Node {
      title: String
      description: String
      date: Date @dateformat
      author: Author
      slug: String
    }
  `)
}
