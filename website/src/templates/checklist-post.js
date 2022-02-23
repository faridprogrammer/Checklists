import * as React from "react"
import { graphql } from "gatsby"
import globals from "../globals"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import * as md5 from "md5"
import * as croma from "chroma-js"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.checklistsJson
  const siteTitle = data.site.siteMetadata?.title || `Title`
  let sourceLink = null;
  let author = null;
  let backGroundColor = [255, 255, 255];
  globals.resetBackgroundColor();

  const handleCheck = (evt) => {
    const checked = evt.target.checked;
    if (checked) {
      backGroundColor[0] = backGroundColor[0] - (100 / post.items.length);
      backGroundColor[2] = backGroundColor[2] - (100 / post.items.length);
      document.body.style.background = croma(backGroundColor);
    }
    else {
      backGroundColor[0] = backGroundColor[0] + (100 / post.items.length);
      backGroundColor[2] = backGroundColor[2] + (100 / post.items.length);
      document.body.style.background = croma(backGroundColor);
    }
  };


  if (post.source) {
    sourceLink = (
      <div>
        <div style={{ 'margin-bottom': '25px' }}><LinkPreview url={post.source} /></div>
        <hr />
      </div>
    );
  }
  if (post.author) {
    author = (
      <div className="bio">
        <img
          className="bio-avatar"
          src={`https://www.gravatar.com/avatar/${md5(post.author.email.trim())}`}
          width={50}
          height={50}
          quality={95}
          alt=""
        />
        {post.author?.name && (
          <p>
            By <strong>{post.author.name}</strong> {post.author?.summary || null}
            {` `}
            <br />
            <a href={`https://twitter.com/${post.author.twitter || ``}`}>
              Follow me on Twitter
            </a>
          </p>
        )}
      </div>
    );
  }
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
          <h4 itemProp="headline">{post.title}</h4>
        </header>
        <section>
          <div style={{ 'display': 'flex', 'height': '10px', "width": "100%", 'marginBottom': '20px' }}>
            {
              post.tags.map(tag => { return (<div style={{ 'flex': '1', 'background-color': globals.getTagColor(tag) }}></div>) })
            }
          </div>
        </section>
        <section class="checkboxes">
          {
            post.items.map((itemTxt) => {
              return (
                <label class="checklist-item checkbox-container">{itemTxt}
                  <input type="checkbox" onChange={handleCheck} />
                  <span class="checkmark"></span>
                </label>
              )
            })
          }
        </section>
        <hr />
        <footer>
          {sourceLink}
          {author}
        </footer>
      </article>
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
      author{
        name
        twitter
        email
      }
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
