import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/hero';
import Canvas from '../components/canvas';
import AllPosts from '../components/all-posts';

interface IProps {
  children: React.ReactChildren;
}

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

const HomePage: React.FC<IProps & IQueryProps> = props => {
  const { data } = props;
  const articles = data.allMarkdownRemark.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    abstract: node.frontmatter.abstract,
    categories: node.frontmatter.categories,
    link: node.fields.slug,
    author: data.site.siteMetadata.author,
  }));

  return (
    <Layout location={props.location}>
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
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
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
