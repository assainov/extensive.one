export interface IProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

export interface IQuery {
  allMarkdownRemark: {
    group: {
      fieldValue: string;
    }[];
  };
}

export type MenuItem = {
  title: string;
  url: string | null;
  external: boolean;
  children?: {
    title: string;
    url: string;
  }[];
};
