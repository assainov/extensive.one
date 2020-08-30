/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomePageData
// ====================================================

export interface HomePageData_allMarkdownRemark_edges_node_fields {
  slug: string | null;
}

export interface HomePageData_allMarkdownRemark_edges_node_frontmatter {
  date: any | null;
  title: string | null;
  abstract: string | null;
  categories: (string | null)[] | null;
  featured: boolean | null;
}

export interface HomePageData_allMarkdownRemark_edges_node {
  fields: HomePageData_allMarkdownRemark_edges_node_fields | null;
  frontmatter: HomePageData_allMarkdownRemark_edges_node_frontmatter | null;
}

export interface HomePageData_allMarkdownRemark_edges {
  node: HomePageData_allMarkdownRemark_edges_node;
}

export interface HomePageData_allMarkdownRemark {
  edges: HomePageData_allMarkdownRemark_edges[];
}

export interface HomePageData {
  allMarkdownRemark: HomePageData_allMarkdownRemark;
}
