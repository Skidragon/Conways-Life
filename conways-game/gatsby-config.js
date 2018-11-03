module.exports = {
    siteMetadata: {
        title: "Conway's Game of Life"
    },
    plugins: [
      {
        resolve: "gatsby-plugin-styled-components"
      },
      `gatsby-transformer-remark`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `src`,
          path: `${__dirname}/src/`,
        },
      }
    ]
  };