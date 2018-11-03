import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  const infoPage = data.markdownRemark
  return (
      <div>
        <h1>{infoPage.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: infoPage.html }} />
      </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
