const path = require(`path`);

/**
 * Create WordPress Posts
 */
module.exports = async ({ actions, graphql }) => {

  const { createPage } = actions;
  const indexTemplate = path.resolve(`./src/templates/index.js`);

  return graphql(
    `
    {
      site {
        siteMetadata {
          pagePrefix
        }
      }

    }
  `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const { pagePrefix } = result.data.site.siteMetadata;

    createPage({
        path: `/test/`,
        component: indexTemplate,

    })


    // ==== END POSTS ====
    return null;
  })
}