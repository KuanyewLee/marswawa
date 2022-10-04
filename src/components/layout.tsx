import * as React from 'react'
import {
  container,
  background,
} from './layout.module.css'
import { StaticImage } from 'gatsby-plugin-image'

const Layout = ({ children }: any) => {
  return (
    <div className={container}>
      <StaticImage className={background}
        alt="background image"
        src={"../images/background.png"}
      />
      <main>{children}</main>
    </div>
  )
}

export default Layout
