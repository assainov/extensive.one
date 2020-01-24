import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import SEO from './../components/seo';
import { IPageProps } from '../typings/page-props';
import Layout from '../components/layout';
import { CategoriesPageData } from './__generated__/CategoriesPageData';

interface IQueryProps {
  data: CategoriesPageData;
}

const CategoriesPage: React.FC<IQueryProps & IPageProps> = ({
  data,
  location,
}) => {
  const categories = data?.allMarkdownRemark?.group;

  return (
    <Layout location={location}>
      <SEO title={`Categories`} />
      <div>
        <h1>Categories</h1>
        <ul>
          {categories.map(category => {
            const categoryTitle = category.fieldValue || 'No category';
            return (
              <li key={categoryTitle}>
                <Link to={`/categories/${kebabCase(categoryTitle)}/`}>
                  {categoryTitle} ({category.totalCount})
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default CategoriesPage;

export const pageQuery = graphql`
  query CategoriesPageData {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
