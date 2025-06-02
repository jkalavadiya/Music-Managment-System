# Music Management System

A modern web application built with React.js and Node.js for managing music collections.

## Tech Stack

-   **Frontend**: React.js with TypeScript
-   **Backend**: Node.js v20
-   **Build Tool**: Vite
-   **Package Manager**: npm/yarn

## Prerequisites

-   Node.js v20 or higher
-   npm or yarn package manager

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Login Credentials

Default login credentials for testing:

-   Username: emilys
-   Password: emilyspass

## Available Modules

The system includes the following main modules:

1. **Authentication Module**

    - User login and registration
    - Session management

2. **Songs Module**

    - Browse and search songs
    - View song details
    - Manage song metadata

3. **Playlist Module**
    - Create and manage playlists
    - Add/remove songs from playlists

## Development

This project uses Vite for fast development with HMR (Hot Module Replacement) and includes ESLint for code quality.

### Available Plugins

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
    extends: [
        // Remove ...tseslint.configs.recommended and replace with this
        ...tseslint.configs.recommendedTypeChecked,
        // Alternatively, use this for stricter rules
        ...tseslint.configs.strictTypeChecked,
        // Optionally, add this for stylistic rules
        ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
        // other options...
        parserOptions: {
            project: ['./tsconfig.node.json', './tsconfig.app.json'],
            tsconfigRootDir: import.meta.dirname,
        },
    },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
    plugins: {
        // Add the react-x and react-dom plugins
        'react-x': reactX,
        'react-dom': reactDom,
    },
    rules: {
        // other rules...
        // Enable its recommended typescript rules
        ...reactX.configs['recommended-typescript'].rules,
        ...reactDom.configs.recommended.rules,
    },
});
```
