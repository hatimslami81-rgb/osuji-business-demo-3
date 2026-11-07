# Osuji Business — E-commerce & VTU Demo

Professional frontend prototype for a Nigerian trading and distribution company. Includes product catalog, cart/checkout, airtime & data (VTU) purchase flows, WhatsApp-style assistant simulation, and a demo admin dashboard. All commerce and recharge actions use mock data and LocalStorage — no real payments or telecom APIs.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Implemented features

- Responsive storefront with navy / white / green corporate design
- Homepage: hero, categories, VTU promo, featured products, why choose us, footer
- Shop with search, category filters, product details, related products
- Cart with quantity controls and LocalStorage persistence
- Checkout with validation, simulated payment methods, demo order IDs
- Airtime & Data VTU flow (MTN, Airtel, Glo) with confirmation and demo references
- WhatsApp VTU Assistant conversation simulation
- Account page listing local demo orders and VTU transactions
- Admin demo gate + dashboard (products, orders, VTU, customers, sales chart)
- Persistent Demo Mode banner and labels on simulated actions

## Simulated features (need real APIs later)

- Payment processing (bank transfer / online payment)
- Telecom VTU airtime and data delivery
- WhatsApp Business API messaging
- Real authentication for customers and admin
- Live inventory, order fulfilment, and CRM / email delivery
- Verified company phone, address, and social channels

## Deploy

The app is a static SPA.

- **Vercel:** connect the repo or run `npx vercel`. `vercel.json` rewrites all routes to `index.html`.
- **Netlify:** deploy the `dist` folder after `npm run build`. `public/_redirects` handles SPA routing.

```bash
npm run build
# upload / deploy the dist directory
```

## Tech stack

React · Vite · TypeScript · Tailwind CSS · Lucide React · React Router · LocalStorage mock data
