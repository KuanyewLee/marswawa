import * as React from 'react';
import Layout from '../components/layout';
const AboutPage = () => {
    return (React.createElement(Layout, { pageTitle: "About Me" },
        React.createElement("p", null, "Hi there! I'm the proud creator of this site, which I built with Gatsby.")));
};
export const Head = () => React.createElement("title", null, "About Me");
export default AboutPage;
