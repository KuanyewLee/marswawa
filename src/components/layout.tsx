import * as React from 'react'
import {
  container,
  background,
} from './layout.module.css'
import { StaticImage } from 'gatsby-plugin-image'

const Layout = ({ children }: any) => {
  const backgroundUrl = "../images/background.png";
  return (
    <div className={container}>
      <StaticImage className={background}
        alt="background image"
        src={backgroundUrl}
      />
      <main>{children}</main>
    </div>
  )
}

export default Layout
