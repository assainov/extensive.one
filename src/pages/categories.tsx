import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import SEO from './../components/seo';
import { IPageProps } from '../typings/page-props';

interface ICategory {
  fieldValue: string;
  totalCount: number;
}

interface IQueryProps {
  data: {
    allMarkdownRemark: {
      group: ICategory[];
    };
  };
}

const CategoriesPage: React.FC<IQueryProps & IPageProps> = ({
  data: {
    allMarkdownRemark: { group: categories },
  },
}) => (
  <div>
    <SEO title={`Categories`} />
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.fieldValue}>
            <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default CategoriesPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
