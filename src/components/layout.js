import * as React from 'react';
import style from './layout.module.css';
import background from "../images/background.png";
const Layout = ({ children }) => {
    return (React.createElement("div", { className: style.container },
        React.createElement("img", { className: style.background, src: background }),
        React.createElement("main", null, children)));
};
export default Layout;
