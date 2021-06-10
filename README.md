# Inicializando el proyecto con tailwind

   1. Agregar dependencias 

            npm i --save-dev autoprefixer postcss-cli tailwindcss postcss

   2. Crear un archivo tailwind:

            npx tailwind init tailwind.js

   3. Crear en la raíz un archivo de configuración postcss.config.js para soportar clases css nuevas en todos los navegadores.

   4. Crear una carpeta de estilos css en src, y agregar un archivo tailwind.css para importar estilos del framework.

   5. En package.json agregar estos scripts para generar main.css de tailwind

            "scripts": {
                "start": "npm run watch:css && react-scripts start",
                "build": "npm run build:css && react-scripts build",
                "test": "react-scripts test",
                "eject": "react-scripts eject",
                "build:css": "postcss src/css/tailwind.css -o src/css/main.css",
                "watch:css": "postcss src/css/tailwind.css -o src/css/main.css"
            },

   6. Reiniciar el proyecto y verificar que las clases estan funcionando correctamente en App.js por ejemplo. Si trabajas con VSC te recomiendo la extensión Tailwind CSS IntelliSense de Brad Cornes.


## Dependencias Utilizadas

            autoprefixer 
            postcss-cli 
            tailwindcss 
            postcss
            react-router-dom@next
            react-router@next
            react-router@next history


---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
