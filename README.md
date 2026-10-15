# FORMA — Mini E-Commerce Store

FORMA is a modern, responsive mini e-commerce web application built with React. It provides a clean shopping experience where users can browse products, filter by category, search for items, view product details, and manage a shopping cart.

## Features

- **Product Catalogue:** Browse products across Home, Accessories, Workspace, and Technology categories.
- **Category Filtering:** Filter products by their category.
- **Product Search:** Search products by name, category, or description.
- **Product Details:** View individual product information, including images, descriptions, ratings, and prices.
- **Shopping Cart:** Add products to the cart, update quantities, and remove items.
- **Cart Summary:** View the total number of items and the order subtotal.
- **Persistent Cart:** Cart items are saved in the browser using localStorage, so they remain available after refreshing the page.
- **Responsive Design:** Interface adapts to desktop, tablet, and mobile screen sizes.
- **Navigation:** Navigate between the shop, product details, and cart pages.
- **Fallback Images:** Display a placeholder when a product image fails to load.
- **Demo Checkout:** Demonstrate the checkout interaction without processing real payments.

## Tech Stack

- **React** — UI development
- **Vite** — Development server and build tool
- **React Router** — Client-side navigation
- **JavaScript (ES6+)** — Application logic
- **CSS3** — Styling and responsive layouts
- **JSON** — Local product data
- **localStorage** — Cart persistence

## Getting Started

### Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (included with Node.js)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/RutikKadam06/forma-mini-ecommerce.git
```

**2. Navigate to the project directory**

```bash
cd forma-mini-ecommerce
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build locally |

## Project Structure

```text
forma-mini-ecommerce/
├── public/
├── src/
│   ├── components/
│   │   ├── CartItem.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductImage.jsx
│   │   └── QuantityControl.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── products.json
│   ├── hooks/
│   │   └── useCart.js
│   ├── pages/
│   │   ├── CartPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── ProductPage.jsx
│   │   └── ShopPage.jsx
│   ├── utils/
│   │   └── formatPrice.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Application Routes

| Route | Description |
|---|---|
| `/` | Main shop page with product catalogue, search, and category filters |
| `/products/:id` | Individual product details page |
| `/cart` | Shopping cart and order summary |
| Other routes | Not-found page |

## Product Data

Product information is stored locally in `src/data/products.json`. Each product includes fields such as:

- `id`
- `name`
- `category`
- `price`
- `rating`
- `image`
- `description`

The application uses this data to display products, filter search results, render product details, and calculate cart totals.

## Cart Functionality

The shopping cart is managed using React Context, allowing cart state to be shared across components.

Users can:

- Add products to the cart.
- Increase or decrease product quantities.
- Remove products.
- Clear the cart.
- View the item count and subtotal.
- Retain cart data across page refreshes through browser localStorage.

## Checkout

The checkout feature is a demonstration interaction. It does not process real payments, create orders on a server, or require a payment gateway.

## Running a Production Build

To check whether the application builds successfully, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

## Limitations

- Product data is stored locally rather than retrieved from a backend API.
- Cart persistence is browser-specific and uses localStorage.
- User authentication and account management are not implemented.
- Checkout is for demonstration purposes only.
- Product image availability depends on the configured image URLs.

## Repository

GitHub: https://github.com/RutikKadam06/forma-mini-ecommerce

---

**FORMA** — Thoughtfully selected products. A simple shopping experience.
