# Stripe with Supabase (Non-Subscription)

This project demonstrates a basic integration of Stripe payments (one-time payments) with a Next.js application, using Supabase for potential backend operations (though currently not fully utilized).

## Features

*   Displays a list of products.
*   Initiates Stripe Checkout sessions for selected products.
*   Redirects users to Stripe for payment processing.
*   Includes basic success and cancellation pages after Stripe redirection.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (with Turbopack)
*   **UI:** [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
*   **Payments:** [Stripe](https://stripe.com/) (`@stripe/stripe-js`, `stripe`)
*   **Backend/Database (Client):** [Supabase](https://supabase.io/) (`@supabase/supabase-js`)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/FahimFBA/stripe-with-supabase-nonsub.git
    cd stripe-with-supabase-nonsub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
    Populate the `.env.local` file with your Stripe and Supabase credentials (see [Environment Variables](#environment-variables) section below).

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    # or
    # pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The following environment variables are required. Add them to your `.env.local` file:

*   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key.
*   `STRIPE_SECRET_KEY`: Your Stripe secret key.
*   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key.
*   `SUCCESS_URL`: The URL to redirect to after a successful payment (e.g., `http://localhost:3000/success`).
*   `CANCEL_URL`: The URL to redirect to if the payment is cancelled (e.g., `http://localhost:3000/cancel`).
*   `STRIPE_WEBHOOK_SECRET`: (Optional but recommended for webhook handling) Your Stripe webhook signing secret. *Note: Webhook handling is not implemented yet.*

## Project Structure

```
.
├── function/                 # Potentially for serverless functions (currently contains a duplicate checkout logic)
│   └── create-checkout-session/
│       └── index.ts
├── rc/                       # Reusable Components
│   └── components/
│       └── ProductCard.tsx   # Component to display product and handle 'Buy Now'
├── script/                   # Utility scripts (contains a markdown file)
│   └── automate-folder-struct.md
├── src/                      # Main application source code
│   ├── lib/                  # Library files (Stripe/Supabase clients)
│   │   ├── stripe.ts         # Stripe client initialization (not used in API routes)
│   │   └── supabaseClient.ts # Supabase client initialization
│   ├── pages/                # Next.js pages and API routes
│   │   ├── api/              # API routes
│   │   │   ├── create-checkout-session.ts # Creates Stripe Checkout session
│   │   │   └── webhook.ts    # Stripe webhook handler (currently empty)
│   │   ├── _app.tsx          # Custom App component
│   │   ├── cancel.tsx        # Payment cancellation page
│   │   ├── index.tsx         # Home page displaying products
│   │   ├── layout.tsx        # Root layout
│   │   └── success.tsx       # Payment success page
│   ├── styles/               # Global styles
│   │   └── globals.css
│   ├── favicon.ico
│   └── metadata.ts           # Site metadata
├── supabase/                 # Supabase specific files
│   ├── schema.sql            # Database schema definition (currently empty)
│   └── supabase-config.ts    # Supabase configuration (not standard Supabase CLI usage)
├── .env.example              # Example environment variables
├── .gitignore
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies and scripts
├── README.md                 # This file
└── tsconfig.json             # TypeScript configuration
```

## Missing Features / Limitations

*   **Stripe Webhook Handling:** The `/api/webhook` endpoint is currently empty. This means the application does not verify payment success via webhooks or perform actions after a successful payment (e.g., update a database, trigger fulfillment). Implementing webhook handling is crucial for production applications.
*   **Supabase Integration:** While the Supabase client is set up, there is no defined database schema (`supabase/schema.sql` is empty) and no current interaction with Supabase (e.g., storing orders, user data).
*   **Error Handling:** Basic error handling exists, but could be more robust.
*   **Duplicate Logic:** The `function/create-checkout-session/index.ts` seems to duplicate the logic present in `src/pages/api/create-checkout-session.ts`.

This project serves as a starting point for integrating Stripe one-time payments into a Next.js application. Further development is needed to add essential features like webhook handling and database integration for a complete solution.