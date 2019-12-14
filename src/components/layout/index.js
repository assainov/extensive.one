import React, { useState } from "react"
import Helmet from 'react-helmet'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../../styles/main.scss"
import Header from '../header'
import MobileMenu from '../mobile-menu'
import './styles.scss'
import Footer from '../footer'
import Notification from '../notification'

export default props => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <React.Fragment>
      <Helmet>
        <style>{'body { background-color: var(--color-primary); }'}</style>
      </Helmet>
      <Header menuOpen={menuOpen} toggleMenu={handleToggleMenu} />
      <MobileMenu menuOpen={menuOpen} toggleMenu={handleToggleMenu} />
      {props.children}
      <Footer />
      <Notification />
    </React.Fragment>
  )
}
