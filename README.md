# deorsum (Energy Decision Support Tool)

© Oliver Hardman, Owain Lansdowne, Ben McDonald, Sean Marney, Adam Kalbouneh

## Description
DSS is a web-based data analysis tool used to inform customers of actions they could take to reduce energy usage. These 'insights' are derived from BEMS and supplier data based on an algorithm provided by E2S Ltd. (the client)

# Stack
DSS is engineered with a full-stack approach. It is heavily based on Next.js, which in turn relies on React and its own vanilla HTTP server.

Next.js gives us the UI building capabilities of React without suffering from the typical disadvantages of client-side rendering (poor SEO, slow load times). As a SSR (server-side renderer) we can cache data where necessary and take care of building from the server's end. The idea is to cache as much as possible to vastly improve load times and ensure excellent compatibility with as many devices as possible.

From a development POV, Next.js is fantastic to work with because both elements of the client-server model are so heavily integrated. No need for separate repos (or even a monorepo approach) because the code is the same. Next.js is also build entirely with Node.js, so shares a common language and supports all the latest ES6 features, providing a simple and easy to setup environment for contributors.

# Further reading

## Key tools

Next.js: https://nextjs.org/
React: https://reactjs.org/
Node.js: https://nodejs.org/

React and Next rely heavily on webpack. It's really useful to learn how it compiles as it can help you make sensible design decisions:
https://webpack.js.org/

## Other libraries

### Tailwind
Tailwind is our styling framework of choice. It was chosen because of how fast interfaces can be built with it. It also encourages good styling practices by providing utility classes.
https://tailwindcss.com/

### ECharts
An open-source data visulisation platform. We use this for our data forecasting and some other reports.
https://echarts.apache.org/en/index.html

# Build instructions (for prod.)
1. [Install Node.js (16.x or above is fine)](https://nodejs.org) (`brew install node` on macOS)
2. Clone the repo (`git clone git@git.cardiff.ac.uk:c2012125/deorsum.git`)
3. Install modules (`npm install`)
4. Build! 🔨 (`next build`)
