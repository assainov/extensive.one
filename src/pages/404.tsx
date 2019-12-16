import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { IPageProps } from '../typings/page-props';

class NotFoundPage extends React.Component<IPageProps> {
  render(): JSX.Element {
    return (
      <Layout location={this.props.location}>
        <SEO title={`404: Not Found`} />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    );
  }
}

export default NotFoundPage;
