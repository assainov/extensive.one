interface IPageInput {
  path: string;
  component: string;
  layout?: string;
  context?: any;
}

interface IBoundActionCreators {
  createPage: (page: IPageInput) => void;
  deletePage: (page: IPageInput) => void;
  createRedirect: (opts: {
    fromPath: string;
    isPermanent?: boolean;
    redirectInBrowser?: boolean;
    toPath: string;
  }) => void;
  createNodeField: (opts: { name: string; node: any; value: string }) => void;
}

export type GatsbyCreatePages = (fns: { graphql: any; boundActionCreators: IBoundActionCreators }) => void;

export type GatsbyOnCreateNode = (fns: { node: any; boundActionCreators: IBoundActionCreators; getNode: any }) => void;
