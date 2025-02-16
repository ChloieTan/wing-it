# Project Setup

1. `npm install`
2. Add `.env` file:
   1. ```
      DATABASE_URL="mysql://<username>:<password>@<host>:<port>/wingit"
      ```
3. `npm run migration:dev`
4. `npm run migration:reset`
5. `npm run dev`

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
