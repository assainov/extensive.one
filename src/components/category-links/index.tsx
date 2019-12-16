import * as React from 'react';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';

interface IProps {
  categories: string[];
}

const CategoryLinks: React.FC<IProps> = ({ categories }) => (
  <React.Fragment>
    {categories.map((category, index) => {
      if (index === categories.length - 1)
        return (
          <Link key={category} to={`/categories/${kebabCase(category)}`}>
            {category}
          </Link>
        );
      return (
        <React.Fragment key={category}>
          <Link to={`/categories/${kebabCase(category)}`}>{category}</Link>
          {', '}
        </React.Fragment>
      );
    })}
  </React.Fragment>
);

export default CategoryLinks;
