import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Canvas from '../components/canvas';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostTitle from '../components/post-title';
import Subscribe from '../components/subscribe';
import styles from './blog-post.module.scss';
import { IFrontMatter, INode } from '../pages';
import { IPageProps } from '../typings/page-props';
import { config } from '../../content/website/config';

interface IQueryProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: IFrontMatter;
    };
  };
}

interface ITemplateProps {
  pageContext: {
    next: INode;
    previous: INode;
    slug: string;
  };
}

class BlogPostTemplate extends React.Component<
  IPageProps & ITemplateProps & IQueryProps
> {
  render(): JSX.Element {
    const post = this.props.data.markdownRemark;
    const { previous, next, slug } = this.props.pageContext;
    const { location } = this.props;
    const { siteUrl, codeRepository } = config;

    const postUrl = encodeURIComponent(`${siteUrl + slug}`);
    const feedbackUrl = `${codeRepository}/issues/new?labels=comment&title=Comment%20About: ${post.frontmatter.title}&body=Your%20comment%20here...`;
    const discussUrl = `https://mobile.twitter.com/search?q=${postUrl}`;

    return (
      <Layout location={location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.abstract}
        />
        <Canvas>
          <PostTitle {...post.frontmatter} />
          <div className={styles.blogPost}>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <footer>
              <h2>Comments</h2>
              <a href={feedbackUrl} target="_blank" rel="noopener noreferrer">
                Ask a question or submit feedback on GitHub.
              </a>
              <div>
                <a href={discussUrl} target="_blank" rel="noopener noreferrer">
                  Discuss on Twitter
                </a>
              </div>
            </footer>
          </div>
          <Subscribe post={{ title: post.frontmatter.title, url: postUrl }} />
          <Bio />

          <ul className={styles.readNext}>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← Previous article: {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  Next article: {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </Canvas>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        abstract
        categories
      }
    }
  }
`;
