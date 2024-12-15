![home](https://github.com/user-attachments/assets/3793324e-6c0e-4c8a-b2dc-76c04e105b5c)

# Deckly

Deckly is a flashcard application designed to make remembering things easier and more efficient. It leverages the spaced repetition technique to help users optimize their learning process by scheduling reviews at strategic intervals. Whether you're learning a new language, preparing for medical exams, or mastering any knowledge-intensive subject, Deckly is your go-to solution for boosting memory retention, reducing study time, and enhancing productivity.

The application is built using Next.js, Neon Postgres database with Drizzle, Shadcn and Tailwind CSS.

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Database Model](#database-model)
- [Getting Started](#getting-started)
- [Running The Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Future Enhancements](#future-enhancements)
- [Attributions](#attributions)

## Screenshots

### Decks Page
![decks](https://github.com/user-attachments/assets/b4b392bf-3d01-4cd7-af78-c097e5d247cf)
Displays an overview of all the decks created by the user. Includes options for creating new decks and managing existing ones.

### Cards Page
![card_brower](https://github.com/user-attachments/assets/593e4614-f539-4659-b6a7-62e5dcd2dacf)
Users can view all cards within a selected deck. This page allows the addition, editing, or deletion of cards.

### Statistics Page
![statistics](https://github.com/user-attachments/assets/cb23b991-4259-46e2-8a04-6e53ec54019f)
Visualizes user activity and card statistics, providing insights into learning progress and overall performance.

### Premium Page
![premium](https://github.com/user-attachments/assets/7efaf522-acc6-471c-8118-1faf2b4e8da9)
Showcases the benefits of premium subscriptions, such as unlocking higher deck limits and gaining access to exclusive features.

## Features

- **Spaced repetition algorithm**: Schedules reviews for cards to optimize learning efficiency.
- **Deck management**: Create, edit, delete, and organize flashcard decks.
- **Search and Filter**: Quickly find cards with advanced search and filtering options.
- **Statistics Dashboard**: Track learning progress and review activity with detailed charts and summaries.
- **Premium subscription**: Access advanced features and extended deck limits.
- **User Authentication**: Secure login options using email/password or OAuth integrations with Google and GitHub.

## Technologies Used

- **Next.js**: React framework for server-side rendering.
- **Shadcn**: UI components library for customizable UI elements.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Neon**: Cloud-based PostgreSQL database.
- **Drizzle**: Type-safe and lightweight ORM for database management.
- **Auth.js**: User authentication with email/password and OAuth integration with Google and GitHub.
- **TanStack Query**: For efficient data fetching and state management.
- **TanStack Table** : For displaying and managing table data.
- **Stripe**: Payment processing for premium subscriptions.

## Database Model
![database](https://github.com/user-attachments/assets/7973cf70-738a-4bf4-aa2f-603f5302f007)

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

#### Setup Neon Postgress database

1. [Create a Neon account](https://neon.tech/) and create a new project. Navigate to the **Connection Details** section in the project console to get the database connection string. This is to be set at the `DATABASE_URL` variable in the `.env` file.

#### Setup Auth.js OAuth providers

1. [Configure Google for OAuth](https://authjs.dev/getting-started/authentication/oauth) to get **Client ID** and **Client Secret**. They are to be set at the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` variables in the `.env` file.
1. [Configure GitHub for OAuth](https://authjs.dev/guides/configuring-github) to get the **Client ID** and **Client Secret**. They are to be set at the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` variables in the `.env` file.

#### Setup Stripe

1. [Create a Stripe account](https://stripe.com/) and get the [secret key](https://dashboard.stripe.com/test/apikeys) from the developer tools. This secret key is to be set at the `STRIPE_SECRET_KEY` variable in the `.env` file.
2. In the [Product catalog](https://dashboard.stripe.com/test/products), create two subscription products, one for Standard plan and another for Premium plan. Get the price ID for both products to be set at the `STRIPE_STANDARD_PLAN_PRICE_ID` and `STRIPE_PREMIUM_PLAN_PRICE_ID` variables in the `.env` file respectively.
3. [Download the Stripe CLI](https://stripe.com/docs/stripe-cli#install) and log in with your Stripe account.
   ```bash
   stripe login
   ```
4. Run the webhook listener to get the webhook signing secret. This secret is to be set at the `STRIPE_WEBHOOK_SECRET` variable in the `.env` file.
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

### To Run Locally

1. Open terminal and clone the repository:

   ```bash
   git clone https://github.com/guanjunming/deckly.git
   ```

2. Navigate to the project directory:

   ```bash
   cd deckly
   ```

3. Install the dependencies:

   ```bash
   npm i --legacy-peer-deps
   ```

   The --legacy-peer-deps flag is needed in order to resolve issues with installing packages that does not list React 19 as a peer dependency.

4. Create a `.env` file in the project directory and add the following variables:

   ```
   NEXT_PUBLIC_SERVER_URL=          # Public server url. Use http://localhost:3000 for local development
   DATABASE_URL=                    # Neon Postgres database connection string
   AUTH_SECRET=                     # Secret key for Auth.js
   GOOGLE_CLIENT_ID=                # Google OAuth client ID
   GOOGLE_CLIENT_SECRET=            # Google OAuth client secret
   GITHUB_CLIENT_ID=                # GitHub OAuth client ID
   GITHUB_CLIENT_SECRET=            # GitHub OAuth client secret
   STRIPE_SECRET_KEY=               # Secret key for Stripe API access
   STRIPE_STANDARD_PLAN_PRICE_ID=   # Price ID for Standard Plan product defined in Stripe dashboard
   STRIPE_PREMIUM_PLAN_PRICE_ID=    # Price ID for Premium Plan product defined in Stripe dashboard
   STRIPE_WEBHOOK_SECRET=           # Stripe webhook signing secret generated from Stripe CLI
   ```

5. Create tables in the Neon Postgress database:
   ```bash
   npm run db:migrate
   ```

## Running The Application

1. Open terminal and run the server:

   ```bash
   npm run dev
   ```

2. In another terminal, run the Stripe webhook listener:
   ```bash
   npm run stripe:webhook
   ```

## Folder Structure

The project structure is organized as follows:

```

deckly/
├── public/ # Static files (images, icons)
├── src/
│ ├── app/ # App Router and API Route Handlers
│ ├── components/ # Reusable React components
│ ├── data/ # Constants and data configurations
│ ├── db/ # Drizzle database schema and migration
│ ├── hooks/ # Custom hooks
│ ├── lib/ # Utility functions
│ ├── schemas/ # Zod validation schemas
│ ├── types/ # Typescript type declarations
├── .env # Environment variables (not tracked in version control)
├── package.json # Dependencies and scripts

```

## Future Enhancements

1. **Rich Media** : Add support for rich text editing and allow embedding of images and audio clips.
2. **Custom Deck Options**: Allow users to customize review intervals and spaced repetition settings.
3. **Enhanced Statistics**: Add more charts to provide more insights into user progress.
4. **Import/Export**: Add functionality import/export decks to file (eg. csv, json).
5. **Deck Sharing**: Introduce a public deck marketplace where users can browse, upload, and download decks.
6. **Theme**: Allow users to switch between light and dark modes.

## Attributions

### Resources

- App logo from [Flaticon](https://www.flaticon.com/free-icon/letter-d_6819078).
- Home page image from [Unsplash](https://unsplash.com/).
- Icons from [Lucide React](https://lucide.dev/guide/packages/lucide-react) and [React Icons](https://react-icons.github.io/react-icons/).
- UI inspiration from [Shadcn examples](https://ui.shadcn.com/examples) and [Anki](https://apps.ankiweb.net/).

### References

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle Documentation](https://orm.drizzle.team/docs/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn Documentation](https://ui.shadcn.com/docs)
- [Anki Manual](https://docs.ankiweb.net/)
