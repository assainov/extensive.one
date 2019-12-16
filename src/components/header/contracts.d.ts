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
  menuOpen: boolean;
  toggleMenu: () => void;
}
