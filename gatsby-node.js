const moment = require("moment")

const DEPLOY_ENV = process.env.DEPLOY_ENV || "lbn_published_production"

/**
 * Generate node edges
 *
 * @param {any} { node, actions, getNode }
 */
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  /**
   * If these don't exist, the LBN WordPress Plugin isn't installed – so build all posts.
   */
  if (
    !Object.prototype.hasOwnProperty.call(node, "meta") ||
    !Object.prototype.hasOwnProperty.call(node.meta, "lbn_published_production")
  ) {
    createNodeField({ node, name: "deploy", value: true })
  } else {
    let deploy

    if (node.meta[DEPLOY_ENV]) {
      deploy = true
      createNodeField({ node, name: "deploy", value: deploy })
    } else {
      deploy = false
      createNodeField({ node, name: "deploy", value: deploy })
    }
  }

  if (node.internal.type === `wordpress__POST`) {
    let date
    let dateEvent = new Date()
    if (node.acf && node.acf.date_de_levenement) {
      dateEvent = node.acf.date_de_levenement
    } else if (node.wpcf_date && node.wpcf_heure) {
      dateEvent = `${node.wpcf_date} ${moment(node.date).format("YYYY")} ${
        node.wpcf_heure
      }`
      date = dateEvent.split(/ |\.|H|h/)
      dateEvent = moment(
        `${date[1]}-${date[2]}-${date[3]}-${date[4]}:${date[5]}`,
        "DD-MM-YYYY-HH:mm"
      ).toDate()
    }
    createNodeField({ node, name: "dateEv", value: dateEvent })
    console.log("youyou")
  }
}

const createPosts = require("./gatsby/createPosts")
const createPages = require("./gatsby/createPages")
const createCategories = require("./gatsby/createCategories")
// const createIndex = require('./gatsby/createIndex');

exports.createPages = async ({ actions, graphql }) => {
  await createPosts({ actions, graphql })
  await createPages({ actions, graphql })
  // await createIndex({ actions, graphql });

  await createCategories({ actions, graphql })
}
