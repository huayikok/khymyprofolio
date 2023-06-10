# current Node version
14.15.1

# install NVM to handle different Node versions

# ----------------------------------------------
# SETUP REACT PROJECT

# 👇️ create a React project setup
npx create-react-app khymyprofolio
cd khymyprofolio

# ----------------------------------------------
# MATERIAL UI

# 👇️ with NPM
npm install @material-ui/core
npm install @material-ui/icons
npm install @mui/material @emotion/react @emotion/styled --force

# 👇️ only if you use @mui/icons-material
npm install @mui/icons-material --force

# 👇️ only if you use @mui/lab
npm install @mui/lab --force

# ----------------------------------------------
# ZUSTAND

# 👇️ only if you use zustand
npm install zustand

# ----------------------------------------------
# FORTAWESOME

# 👇️ only if you use fortawesome
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome


# ----------------------------------------------
# HOSTING ON GITHUB

# 👇️ only if you use github hosting
npm install --save gh-pages

# ----------------------------------------------
# DEVELOPMENT

# 👇️ local run your project
npm run start

# 👇️ build your project
npm run build

# 👇️ deploy your project to github hosting
npm run deploy