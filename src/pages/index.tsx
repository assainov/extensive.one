import * as React from 'react';
import { graphql } from 'gatsby';

import { config } from '../../content/website/config';
import { IPageProps } from '../typings/page-props';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/hero';
import Canvas from '../components/canvas';
import AllPosts from '../components/all-posts';
import { HomePageData } from './__generated__/HomePageData';
import notEmpty from '../utils/not-empty';

const log = console.log;

interface IQueryProps {
  data: HomePageData;
}

const HomePage: React.FC<IQueryProps & IPageProps> = ({ data, location }) => {
  const articles = data.allMarkdownRemark.edges
    .map(({ node }) => {
      const title = node.frontmatter?.title;
      const date = node.frontmatter?.date;
      const abstract = node.frontmatter?.abstract;
      const categories = node.frontmatter?.categories;
      const link = node.fields?.slug;
      const featured = node.frontmatter?.featured || false;

      if (!title || !date || !abstract || !categories || !link) {
        log('Error retrieving article data', node);
        return;
      }

      return {
        title: title,
        date: date,
        abstract: abstract,
        categories: categories,
        link: link,
        author: config.author,
        featured: featured,
      };
    })
    .filter(notEmpty);

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <Layout location={location}>
      <SEO title={`Home`} />
      <Hero articles={featuredArticles} />
      <Canvas>
        <AllPosts articles={articles} />
      </Canvas>
    </Layout>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageData {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            abstract
            categories
            featured
          }
        }
      }
    }
  }
`;
