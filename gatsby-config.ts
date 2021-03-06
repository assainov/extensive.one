import { config } from './content/website/config';
import dotenv from 'dotenv';

const {
  siteTitle,
  siteDescription,
  siteUrl,
  siteColors,
  siteIcons,
  heapAnalyticsId,
} = config;

dotenv.config({
  path: `.env`,
});

export default {
  siteMetadata: {
    title: siteTitle,
    description: siteDescription,
    siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-heap',
      options: {
        appId: heapAnalyticsId,
        enableOnDevMode: true, // if 'false', heap will be fired on NODE_ENV=production only
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-dark-mode',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Josefin Sans\:400,600`, `Domine\:400`],
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
    `gatsby-plugin-feed`,
    `gatsby-plugin-catch-links`,
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
    {
      resolve: 'gatsby-plugin-codegen',
      options: {},
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/', disallow: '/reading-list/' }],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ['/reading-list/'],
      },
    },
  ],
};
