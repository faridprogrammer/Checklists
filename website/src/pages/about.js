import * as React from "react"
import { graphql } from "gatsby"
import globals from "../globals"
import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title;

    globals.resetBackgroundColor();

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title="About" />
            <h4>What is it?</h4>
            <p>
                This website contains some checklists for those who think the checklists are useful and using them.<br/>
                The checklists available here can be gathered from elsewhere which in these cases the source of checklists is provided and accessible at the bottom of checklist page.
            </p>
            <h4>Contact me</h4>
            <p>
                You can get in touch with me by <a href="faridbekran15@gmail.com">email</a>, <a href="https://twitter.com/faridprogrammer">twitter</a> account or <a href="https://www.linkedin.com/in/faridbekran/">linkedin</a> account.
            </p>
        </Layout>
    )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
            name
            email
            summary
        }
      }
    }
  }
`
