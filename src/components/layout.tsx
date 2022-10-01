import * as React from 'react'
import { Link } from 'gatsby'
import {
  container,
  navLinks,
  navLinkItem,
  navLinkText,
  background,
} from './layout.module.css'
import { StaticImage } from 'gatsby-plugin-image'

const Layout = ({ children }: any) => {

  const backgroundURL = "../images/background.png"

  return (
    <div className={container}>

      {/* <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
        </ul>
      </nav> */}

      <StaticImage className={background}
        alt="background image"
        src={backgroundURL}
      />

      <main>
        {children}
      </main>

    </div>
  )
}

export default Layout