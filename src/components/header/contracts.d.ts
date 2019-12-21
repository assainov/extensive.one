import { WindowLocation } from '@reach/router';

export interface ICategory {
  fieldValue: string;
  totalCount: number;
}

export interface IQuery {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    group: ICategory[];
  };
}

export interface IPureHeaderProps extends IHeaderProps {
  title: string;
  categories: ICategory[];
}

export interface IHeaderProps {
  location?: WindowLocation;
  menuOpen: boolean;
  toggleMenu: () => void;
}
