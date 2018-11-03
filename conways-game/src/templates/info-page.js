import React from "react"
import { graphql } from "gatsby"
import InfoLayout from "../components/MarkdownLayouts/InfoLayout";
export default ({ data }) => {
  const infoPage = data.markdownRemark
  return (
      <InfoLayout title ={infoPage.frontmatter.title}>
        <div dangerouslySetInnerHTML={{ __html: infoPage.html }} />
      </InfoLayout>
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
