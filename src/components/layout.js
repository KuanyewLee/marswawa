import * as React from 'react';
import { container, background, } from './layout.module.css';
import { StaticImage } from 'gatsby-plugin-image';
const Layout = ({ children }) => {
    return (React.createElement("div", { className: container },
        React.createElement(StaticImage, { className: background, alt: "background image", src: "../images/background.png" }),
        React.createElement("main", null, children)));
};
export default Layout;
