import * as React from 'react';
import Helmet from 'react-helmet';
import { WindowLocation } from '@reach/router';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/main.scss';
import Header from '../header';
import MobileMenu from '../mobile-menu';
import './styles.scss';
import Footer from '../footer';
import Notification from '../notification';

interface IProps {
  location?: WindowLocation;
}

const Layout: React.FC<IProps> = props => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleToggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  return (
    <React.Fragment>
      <Helmet>
        <style>{'body { background-color: var(--color-background-primary); }'}</style>
      </Helmet>
      <Header menuOpen={menuOpen} toggleMenu={handleToggleMenu} location={props.location} />
      <MobileMenu menuOpen={menuOpen} toggleMenu={handleToggleMenu} />
      {props.children}
      <Footer />
      <Notification />
    </React.Fragment>
  );
};

export default Layout;
