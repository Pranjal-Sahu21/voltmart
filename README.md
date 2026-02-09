# ⚡ Voltmart: Quick-Commerce Electronics Platform


**A modern, feature-rich e-commerce web application built with React, designed for seamless shopping experiences with fast performance, smooth animations, and secure authentication.**



---

![Preview](https://i.postimg.cc/wjyGm2bC/Voltmart.png)

---



## ✨ Features

### Core Commerce Features
- **🛍️ Product Catalog:** Browse products with detailed product information
- **🔍 Advanced Filtering:** Filter products by category, price range, and ratings
- **🛒 Shopping Cart:** Add/remove items with persistent local storage
- **📦 Order Management:** Track and view order history
- **💳 Secure Checkout:** Seamless payment flow with success confirmation

### Authentication & Security
- **🔐 Secure Authentication:** Powered by Clerk for OAuth
- **👤 User Profiles:** Personalized user experience with Clerk integration
- **🛡️ Protected Routes:** Restricted access to checkout and user-specific pages

### User Experience
- **✨ Rich Animations:** Lottie animations and Framer Motion transitions
- **🎠 Interactive Carousels:** React Slick for product browsing
- **🎨 Parallax Effects:** Immersive visual depth with React Parallax
- **📱 Responsive Design:** Mobile-first approach with Tailwind CSS
- **🔔 Toast Notifications:** Real-time feedback for user actions
- **⚡ Fast Navigation:** Smooth page transitions with React Router
- **🌙 Modern UI:** Lucide React & React Icons for scalable icons

### Developer Features
- **🎯 Context API:** Global state management for cart and product data
- **💾 Local Storage:** Cart and order persistence across sessions
- **📡 Axios Integration:** Clean HTTP client for API requests
- **🎨 Tailwind CSS:** Utility-first CSS framework for rapid UI development
- **🔧 ESLint:** Code quality & consistency checks

---

## 🛠️ Tech Stack

### Frontend Architecture
| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React.js | 19.2.0 |
| **Routing** | React Router DOM | 7.10.1 |
| **State Management** | Context API | Built-in |
| **Styling** | Tailwind CSS | 4.1.17 |
| **Build Tool** | Vite | 7.2.4 |

### Authentication & UX
| Feature | Library | Version |
|---------|---------|---------|
| **Authentication** | Clerk React | 5.58.0 |
| **Animations** | Framer Motion | 12.23.25 |
| **Lottie Support** | Lottie React | 2.4.1 |
| **Carousels** | React Slick | 0.31.0 |
| **Parallax** | React Parallax | 3.5.2 |
| **Notifications** | React Toastify | 11.0.5 |

### Utilities
| Purpose | Library | Version |
|---------|---------|---------|
| **Icons** | Lucide React | 0.556.0 |
| **Icons (Alternative)** | React Icons | 5.5.0 |
| **Range Slider** | RC Slider | 11.1.9 |
| **HTTP Client** | Axios | 1.13.2 |

### Development Tools
| Tool | Version |
|------|---------|
| **ESLint** | 9.39.1 |
| **TypeScript Definitions** | React 19.2.5, React DOM 19.2.3 |

### Deployment
- **Hosting:** Netlify with automatic deployments
- **SPA Routing:** Configured for single-page application

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

```bash
Node.js (v18.0.0 or higher)
npm (v9.0.0 or higher) or yarn (v3.0.0+)
Git
A Clerk account (for authentication)
```

**Verify installation:**
```bash
node --version
npm --version
git --version
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Pranjal-Sahu21/voltmart.git
cd voltmart
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

Get your keys from [Clerk Dashboard](https://dashboard.clerk.com/).

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

---

## 📁 Project Structure

```
ecommerce-electronics/
├── public/                          # Static assets
│
├── src/
│   ├── assets/                      # Lottie JSON animations
│   │   ├── Cartshop.json
│   │   ├── Delivery.json
│   │   ├── EmptyBox.json
│   │   ├── Login.json
│   │   ├── Lonely404.json
│   │   ├── NoOrders.json
│   │   └── PageNotFound.json
│   │
│   ├── components/                  # Reusable React components
│   │   ├── Carousel.jsx            # Product carousel/slider
│   │   ├── CheckoutSuccess.jsx     # Order confirmation
│   │   ├── Features.jsx             # Feature showcase
│   │   ├── FilterSection.jsx        # Product filters
│   │   ├── Footer.jsx               # App footer
│   │   ├── MobileFilter.jsx         # Mobile filter UI
│   │   ├── Navbar.jsx               # Navigation bar
│   │   ├── NotFound.jsx             # 404 page
│   │   ├── Orders.jsx               # Order history
│   │   ├── Pagination.jsx           # Page navigation
│   │   ├── ParallaxComponent.jsx   # Visual effects
│   │   └── ProductCard.jsx          # Product display card
│   │
│   ├── context/                     # Global state management
│   │   ├── CartContext.jsx          # Shopping cart state
│   │   │   ├── addToCart()
│   │   │   ├── removeFromCart()
│   │   │   ├── deleteItem()
│   │   │   ├── clearCart()
│   │   │   └── totalCartQuantity
│   │   │
│   │   └── DataContext.jsx          # Product data state
│   │       ├── fetchAllProducts()
│   │       ├── products[]
│   │       └── productCategories[]
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useLocation.js           # Location hook (custom)
│   │
│   ├── pages/                       # Full page components
│   │   ├── About.jsx                # About information
│   │   ├── Cart.jsx                 # Shopping cart page
│   │   ├── Contact.jsx              # Contact form
│   │   ├── Home.jsx                 # Landing page
│   │   ├── Products.jsx             # Products listing page
│   │   └── SingleProduct.jsx        # Product detail page
│   │
│   ├── utils/                       # Utility functions
│   │   ├── generateOrderId.js       # Order ID generator
│   │   └── orderUtils.js            # Order-related helpers
│   │
│   ├── App.jsx                      # Root component with routing
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles
│
├── .env.local                       # Environment variables (not in repo)
├── eslint.config.js                # ESLint configuration
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration (auto)
├── package.json                    # Dependencies & scripts
├── netlify.toml                    # Netlify deployment config
└── README.md                        # This file
```

---

## 🎯 Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with hot module replacement (HMR).
Access at: `http://localhost:5173`

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally before deployment.

### Linting
```bash
npm run lint
```
Run ESLint to check code quality and identify issues.

---

## ⚙️ Configuration

### Vite Configuration
The project uses Vite with React and Tailwind CSS plugins configured in [vite.config.js](vite.config.js).

### ESLint
Code quality rules are defined in [eslint.config.js](eslint.config.js) with support for React and React Hooks.

### Tailwind CSS
Tailwind CSS is integrated via the `@tailwindcss/vite` plugin for optimal performance.

---

## 📡 API Documentation

### External APIs

#### FakeStore API
The application fetches product data from the FakeStore API.

**Base URL:** `https://fakestoreapi.com`

**Endpoints Used:**

| Method | Endpoint | Purpose | Response |
|--------|----------|---------|----------|
| `GET` | `/products` | Fetch all products | Array of product objects |

**Product Schema:**
```json
{
  "id": 1,
  "title": "Product Name",
  "price": 29.99,
  "description": "Product description",
  "category": "electronics",
  "image": "https://...",
  "rating": {
    "rate": 4.5,
    "count": 100
  }
}
```

### Data Fetching
- **Location:** [src/context/DataContext.jsx](src/context/DataContext.jsx)
- **Client:** Axios (configured in dependencies)
- **Error Handling:** Try-catch with console logging

**Example Usage:**
```jsx
import { useProductsData } from "./context/DataContext";

const MyComponent = () => {
  const { products, productCategories } = useProductsData();
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
};
```

---

## 🔧 Environment Variables

The application uses the following optional environment variables:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | ✅ Yes | Clerk authentication public key | `pk_live_abc123...` |

**Setup Instructions:**

1. Create a `.env.local` file in the root directory
2. Add your Clerk publishable key from [Clerk Dashboard](https://dashboard.clerk.com/)
3. Never commit `.env.local` to version control

**.env.local Example:**
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_KEY_HERE
```

---

## 🚀 Deployment

### Netlify (Recommended)

The project is pre-configured for Netlify deployment with [netlify.toml](netlify.toml).

#### Automatic Deployment (Git Integration)

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Select GitHub and authorize
   - Choose your repository
   - Netlify automatically detects `package.json`

3. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Add Environment Variables in Netlify UI:
     - `VITE_CLERK_PUBLISHABLE_KEY`

#### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### SPA Routing Configuration
The `netlify.toml` file enables SPA routing:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables on Netlify

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add your Clerk key:
   - Key: `VITE_CLERK_PUBLISHABLE_KEY`
   - Value: Your Clerk publishable key

### Deployment Checklist

- [ ] Clerk account created and configured
- [ ] Public key added to `.env.local` locally
- [ ] Repository pushed to GitHub
- [ ] Repository connected to Netlify
- [ ] Environment variables set in Netlify dashboard
- [ ] Production build tested locally (`npm run build && npm run preview`)
- [ ] Deploy triggered and verified at live URL

---

