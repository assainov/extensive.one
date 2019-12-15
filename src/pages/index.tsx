import * as React from 'react';
import { graphql } from 'gatsby';

import { config } from '../../content/website/config';
import { IPageProps } from '../typings/page-props';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/hero';
import Canvas from '../components/canvas';
import AllPosts from '../components/all-posts';

type ICategory = {
  category: string;
};

type INode = {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      date: string;
      title: string;
      abstract: string;
      categories: ICategory[];
    };
  };
};

interface IQueryProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        author: string;
      };
    };
    allMarkdownRemark: {
      edges: INode[];
    };
  };
}

const HomePage: React.FC<IQueryProps & IPageProps> = ({ data, location }) => {
  const articles = data.allMarkdownRemark.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    abstract: node.frontmatter.abstract,
    categories: node.frontmatter.categories,
    link: node.fields.slug,
    author: config.author,
  }));

  return (
    <Layout location={location}>
      <SEO title={`Home`} />
      <Hero articles={articles} />
      <Canvas>
        <AllPosts articles={articles} />
      </Canvas>
    </Layout>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query MarkdownData {
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
          }
        }
      }
    }
  }
`;
