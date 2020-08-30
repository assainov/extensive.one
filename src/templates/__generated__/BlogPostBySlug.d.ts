/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPostBySlug
// ====================================================

export interface BlogPostBySlug_markdownRemark_frontmatter {
  title: string | null;
  date: any | null;
  abstract: string | null;
  categories: (string | null)[] | null;
}

export interface BlogPostBySlug_markdownRemark {
  html: string | null;
  frontmatter: BlogPostBySlug_markdownRemark_frontmatter | null;
}

export interface BlogPostBySlug {
  markdownRemark: BlogPostBySlug_markdownRemark | null;
}

export interface BlogPostBySlugVariables {
  slug: string;
}
