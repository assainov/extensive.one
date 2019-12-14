import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import kebabCase from 'lodash/kebabCase';

// import { PagesCategoriesQuery } from '../typings/graphql-types';

interface ICategory {
  fieldValue: string;
}

interface INode {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
}

interface IQueryResult {
  allMarkdownRemark: {
    edges: INode[];
  };
  categoriesGroup: {
    group: ICategory[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const categoryTemplate = path.resolve(`./src/templates/category.js`);

  const queryResult = await graphql<IQueryResult>(
    `
      query PagesCategoriesQuery {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        categoriesGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }
      }
    `,
  );

  if (queryResult.errors) {
    throw queryResult.errors;
  }

  if (!queryResult.data) {
    throw new Error('ERROR: Could not fetch posts on build');
  }

  // Create blog posts pages.
  const posts = queryResult.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  // Extract category data from query
  const categories = queryResult.data.categoriesGroup.group;

  // Make category pages
  categories.forEach(category => {
    createPage({
      path: `/categories/${kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
      },
    });
  });
};
