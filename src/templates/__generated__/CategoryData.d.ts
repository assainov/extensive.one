/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoryData
// ====================================================

export interface CategoryData_allMarkdownRemark_edges_node_fields {
  slug: string | null;
}

export interface CategoryData_allMarkdownRemark_edges_node_frontmatter {
  title: string | null;
  date: any | null;
  abstract: string | null;
  categories: (string | null)[] | null;
}

export interface CategoryData_allMarkdownRemark_edges_node {
  fields: CategoryData_allMarkdownRemark_edges_node_fields | null;
  frontmatter: CategoryData_allMarkdownRemark_edges_node_frontmatter | null;
}

export interface CategoryData_allMarkdownRemark_edges {
  node: CategoryData_allMarkdownRemark_edges_node;
}

export interface CategoryData_allMarkdownRemark {
  totalCount: number;
  edges: CategoryData_allMarkdownRemark_edges[];
}

export interface CategoryData {
  allMarkdownRemark: CategoryData_allMarkdownRemark;
}

export interface CategoryDataVariables {
  category?: string | null;
}
