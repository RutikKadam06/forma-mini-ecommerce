**FORMA — Mini E-Commerce Store**

A responsive mini e-commerce application built with React and Vite. FORMA showcases everyday products across four categories through a clean, modern shopping interface.

**Features**

- **Product Listing:** Browse 60 products across Home, Accessories, Workspace, and Technology.
- **Search:** Search products by name, category, or description.
- **Category Filtering:** Filter products by category.
- **Product Details:** View individual product information on dedicated pages.
- **Shopping Cart:** Add products, remove items, and increase or decrease quantities.
- **Cart Summary:** View the total number of items and calculate the subtotal.
- **Persistent Cart:** Cart contents are saved in the browser using localStorage.
- **Responsive Design:** Layout adapts to desktop, tablet, and mobile screens.
- **Empty States:** Helpful messages are displayed when no products match a search or the cart is empty.
- **Image Fallbacks:** Placeholder images are displayed when product images fail to load.

**Tech Stack**

- React
- Vite
- JavaScript
- React Router DOM
- CSS
- JSON for local product data
- Browser localStorage for cart persistence

**Project Structure**

```text
forma-store/
├── public/
├── src/
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── products.json
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

**Getting Started**

**Prerequisites**

Install Node.js and npm before running the application.

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd forma-store
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the application.

**How to Use**

1. Browse the products on the home page.
2. Use the search bar or category filters to find products.
3. Select a product to view its details.
4. Click the **+** button to add a product to your bag.
5. Open the bag to manage quantities or remove products.
6. Review the item count and subtotal.
7. Refresh the page to verify that the cart persists.

**Product Data**

Product information is stored locally in `src/data/products.json`. Each product contains an ID, name, category, price, rating, image URL, and description.

The application uses local JSON data and does not require a backend server or external product API.

**Cart Persistence**

The shopping cart is managed using React Context and React state. Cart contents are stored in the browser's localStorage, allowing them to remain available after a page refresh in the same browser.

**Checkout**

Checkout is currently a demonstration feature. No real payment processing, order placement, or backend checkout service is implemented.

**Future Improvements**

- Add sorting by price and rating.
- Improve image loading with local product assets.
- Add product availability and stock validation.
- Implement a real checkout flow and order management.
- Add automated tests for cart and filtering functionality.

**Author**

Developed as a React Developer Intern take-home assessment.

**License**

This project was created for demonstration and assessment purposes.
