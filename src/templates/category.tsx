import * as React from 'react';
import { graphql } from 'gatsby';

import Canvas from '../components/canvas';
import Layout from '../components/layout';
import SEO from '../components/seo';
import AllPosts from '../components/all-posts';
import { isMobileSSR } from '../utils/device-detect';
import { INode } from '../pages';
import { config } from '../../content/website/config';

const { siteTitle, author } = config;

interface IQueryProps {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: {
        node: INode;
      }[];
    };
  };
}

interface ITemplateProps {
  pageContext: {
    category: string;
  };
}

const Categories: React.FC<ITemplateProps & IQueryProps> = ({ pageContext, data }) => {
  const { category } = pageContext;
  const { totalCount } = data.allMarkdownRemark;

  const articles = data.allMarkdownRemark.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    abstract: node.frontmatter.abstract,
    categories: node.frontmatter.categories,
    link: node.fields.slug,
    author: author,
  }));

  return (
    <Layout>
      <SEO title={`${category} Category | ${siteTitle}`} description={`All posts in ${category} Category`} />
      {!isMobileSSR && <div style={{ height: '100px', backgroundColor: 'var(--color-primary)' }} />}
      <Canvas>
        <AllPosts
          heading={`Category &#8231; ${category} &#8231; ${totalCount} Article${totalCount > 1 ? 's' : ''}`}
          articles={articles}
        />
      </Canvas>
    </Layout>
  );
};

export default Categories;

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            abstract
            categories
          }
        }
      }
    }
  }
`;
