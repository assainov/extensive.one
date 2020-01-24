/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BioQuery
// ====================================================

export interface BioQuery_avatar_childImageSharp_fixed {
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

export interface BioQuery_avatar_childImageSharp {
  fixed: BioQuery_avatar_childImageSharp_fixed | null;
}

export interface BioQuery_avatar {
  childImageSharp: BioQuery_avatar_childImageSharp | null;
}

export interface BioQuery {
  avatar: BioQuery_avatar | null;
}
