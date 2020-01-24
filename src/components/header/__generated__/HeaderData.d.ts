/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HeaderData
// ====================================================

export interface HeaderData_site_siteMetadata {
  title: string | null;
}

export interface HeaderData_site {
  siteMetadata: HeaderData_site_siteMetadata | null;
}

export interface HeaderData_allMarkdownRemark_group {
  fieldValue: string | null;
  totalCount: number;
}

export interface HeaderData_allMarkdownRemark {
  group: HeaderData_allMarkdownRemark_group[];
}

export interface HeaderData {
  site: HeaderData_site | null;
  allMarkdownRemark: HeaderData_allMarkdownRemark;
}
