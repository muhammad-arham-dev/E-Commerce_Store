# React E-Commerce App

A modern, responsive e-commerce application built with React and Vite. This project provides a complete shopping experience with product browsing, detailed product views, shopping cart functionality, and a checkout system.

## Features

- 🛍️ **Product Listing** - Browse all available products
- 🔍 **Product Details** - View detailed information about each product
- 🛒 **Shopping Cart** - Add/remove products and manage quantities
- 💳 **Checkout** - Complete purchase flow
- 📱 **Responsive Design** - Mobile-friendly interface using Tailwind CSS
- ⚡ **Fast Performance** - Optimized with Vite for instant HMR (Hot Module Replacement)
- 🎯 **State Management** - Context API for cart management
- 🧩 **Reusable Components** - Modular component architecture
- 📡 **API Integration** - Axios for seamless backend communication

## Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.4
- **Routing**: React Router DOM 7.14.0
- **Styling**: Tailwind CSS 4.2.2 with Vite plugin
- **HTTP Client**: Axios 1.15.0
- **Icons**: Lucide React 1.8.0
- **Linting**: ESLint 9.39.4

## Project Structure

```
react_e-commerce_app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── ProductCard.jsx  # Product card component
│   │   └── Skeleton.jsx     # Loading skeleton
│   ├── context/
│   │   └── CartContext.jsx  # Cart state management
│   ├── pages/               # Page components
│   │   ├── Cart.jsx         # Shopping cart page
│   │   ├── Checkout.jsx     # Checkout page
│   │   ├── Home.jsx         # Home/landing page
│   │   ├── ProductDetail.jsx # Product detail page
│   │   └── Products.jsx     # Products listing page
│   ├── App.jsx             # Root app component
│   ├── main.jsx            # Entry point
│   ├── index.css           # Global styles
│   └── assets/             # Static assets
├── public/                 # Static files
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint rules
├── index.html              # HTML template
└── README.md              # This file
```

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd react_e-commerce_app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Application

### Development Server
Start the development server with hot module replacement:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the next available port).

### Production Build
Build the application for production:
```bash
npm run build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

### Lint Code
Check code quality with ESLint:
```bash
npm run lint
```

## Key Components

### CartContext
Manages the global shopping cart state using React Context API, providing cart items and operations across the entire application.

### ProductCard
Reusable component for displaying individual products with quick actions.

### Skeleton
Loading placeholder component for better UX during data fetching.

### Navbar
Main navigation component with links to different sections of the app.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create optimized production build |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

## Dependencies

### Production
- **react**: Core React library
- **react-dom**: React DOM renderer
- **react-router-dom**: Client-side routing
- **axios**: Promise-based HTTP client
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Beautiful icon library

### Development
- **vite**: Next-generation build tool
- **@vitejs/plugin-react**: React plugin for Vite
- **eslint**: Code quality tool
- **@types/react**: TypeScript types for React

## Environment Setup

This project uses Vite with React and includes ESLint configuration for code quality. Make sure you have Node.js 16+ installed.

## Future Enhancements

- [ ] Add TypeScript support
- [ ] Implement user authentication
- [ ] Add product search and filters
- [ ] Integrate payment gateway
- [ ] Add product reviews and ratings
- [ ] Implement wishlist functionality

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the project repository.
