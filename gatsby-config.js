'use strict';

/**
 * Run TypeScript code without compiling it
 * Source-map-support mimics node's stack trace making debugging easier
 * ts-node register eliminates the need to require ts-node in every file
 */
require('source-map-support').install();
require('ts-node').register();

const { config } = require('./content/website/config'); // eslint-disable-line

const { siteTitle, siteDescription, siteUrl, siteColors, siteIcons } = config;

module.exports = {
  siteMetadata: {
    title: siteTitle,
    description: siteDescription,
    siteUrl,
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Josefin Sans`,
            variants: [`400`, `600`],
          },
          {
            family: `Domine`,
            variants: [`400`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle,
        short_name: siteTitle, //eslint-disable-line
        start_url: `/`, //eslint-disable-line
        background_color: siteColors.background, //eslint-disable-line
        theme_color: siteColors.theme, //eslint-disable-line
        display: `minimal-ui`,
        icon: siteIcons.favicon,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
  ],
};
