import * as React from "react"
import { graphql } from "gatsby"
import globals from "../globals"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import * as md5 from "md5"
import * as croma from "chroma-js"
import { FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, TwitterShareButton, TwitterIcon } from "react-share"

const ChecklistTemplate = ({ data, location }) => {
  const post = data.checklistsJson
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const demo = data.site.siteMetadata?.demo || false
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

  const demoSign = (
    <a class="github-fork-ribbon" href="https://github.com/faridprogrammer/checklists" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>);

  if (post.source) {
    sourceLink = (
      <div>
        <div style={{ 'margin-bottom': '25px' }}><LinkPreview url={post.source} /></div>
        <hr />
      </div>
    );
  }
  const shareUrl = location.href;

  const share = (
    <div>
      <TwitterShareButton
        alt="Share on twitter"
        url={shareUrl}
        title={`Checkout the amazing "${post.title}" check list`}
        className="share-btn">
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <TelegramShareButton
        alt="Share on telegram"
        url={shareUrl}
        title={`Checkout the amazing "${post.title}" check list`}
        className="share-btn">
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <FacebookShareButton
        alt="Share on facebook"
        url={shareUrl}
        quote={`Checkout the amazing "${post.title}" check list`}
        className="share-btn">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );

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
      {demo && demoSign}
      <Seo
        title={post.title}
        description={post.description}
        twitterHandle={post.author.twitter}
      />
      <article
        className="checklist-post"
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
          <div className="footer-container">
            <div>
              {author}
            </div>
            <div style={{ "margin-left": "auto" }}>
              {share}
            </div>
          </div>
        </footer>
      </article>
    </Layout>
  )
}

export default ChecklistTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        demo
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
