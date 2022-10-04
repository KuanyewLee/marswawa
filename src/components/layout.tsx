import * as React from 'react'
import style from './layout.module.css'
import background from "../images/background.png"

const Layout = ({ children }: any) => {
  return (
    <div className={style.container}>
      {/*<StaticImage className={background}*/}
      {/*  alt="background image"*/}
      {/*  src={backgroundUrl}*/}
      {/*/>*/}
      <img className={style.background} src={background}/>
      <main>{children}</main>
    </div>
  )
}

export default Layout
