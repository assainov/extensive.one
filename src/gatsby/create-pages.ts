import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import kebabCase from 'lodash/kebabCase';
import chalk from 'chalk';

const log = console.log;

interface ICategory {
  fieldValue?: string;
}

export interface INode {
  fields?: {
    slug?: string;
  };
  frontmatter?: {
    title?: string;
  };
}

interface IQueryResult {
  allMarkdownRemark?: {
    edges?: {
      node?: INode;
    }[];
  };
  categoriesGroup: {
    group?: ICategory[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);
  const categoryTemplate = path.resolve(`./src/templates/category.tsx`);

  const queryResult = await graphql<IQueryResult>(
    `
      query PagesCategoriesQuery {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
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
  const posts = queryResult?.data?.allMarkdownRemark?.edges || [];

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    const pagePath = post?.node?.fields?.slug;

    if (!pagePath) {
      return log(chalk.yellow(`Warning: Blog post has no path. Skipping...`));
    }

    createPage({
      path: pagePath,
      component: blogPost,
      context: {
        slug: pagePath,
        previous,
        next,
      },
    });
  });

  // Extract category data from query
  const categories = queryResult.data.categoriesGroup?.group || [];

  if (categories.length === 0) {
    return log(
      chalk.yellow(
        `Warning: No categories were found in the blog. Skipping creating category pages.`,
      ),
    );
  }

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
