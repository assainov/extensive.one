import * as React from 'react';
import Helmet from 'react-helmet';

import { config } from '../../content/website/config';

interface IProps {
  description?: string;
  lang?: string;
  meta?: any; // eslint-disable-line
  title: string;
  pageUrl?: string;
}

const {
  siteTitle,
  siteDescription,
  siteLanguage,
  siteUrl,
  author,
  siteIcons: { image },
  googleSearchConsoleTag,
} = config;

const SEO: React.FC<IProps> = ({
  description: metaDescription = siteDescription,
  lang = siteLanguage,
  meta = [],
  title = siteTitle,
  pageUrl,
}) => {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={title !== siteTitle ? `%s | ${siteTitle}` : `%s`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: pageUrl || siteUrl,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: title !== siteTitle ? `article` : `website`,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:url`,
          content: pageUrl || siteUrl,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: image,
        },
        {
          name: googleSearchConsoleTag.name,
          content: googleSearchConsoleTag.content,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
