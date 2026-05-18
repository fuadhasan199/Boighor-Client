# Boighor

Boighor is a full-stack, role-based online bookstore platform designed for seamless book browsing, cart management, and secure purchasing. The application features distinct interfaces and functionalities for both general Users and Admins.

## Live Links
- **Client Live Site:** https://boighor-seven.vercel.app - **Server API URL:** https://boighorserver.vercel.app

## Core Features

### For Users:
- **Authentication:** Secure registration and login powered by Firebase.
- **Cart Management:** Add desired books to the cart with duplicate prevention.
- **Flexible Checkout:** Purchase books via either Cash on Delivery (COD) or online payment using Stripe.
- **User Dashboard:** View and manage personal cart items, order history, and purchasing statistics.

### For Admins:
- **Book Management:** Full CRUD operations (Add new books, update book details, and delete books from the store).
- **User Management:** Monitor registered users and suspend accounts .
- **Admin Dashboard:** Access overall store statistics and management panels.

## Technology Stack

### Frontend:
- React
- React-Router 
- Firebase (Client-side Auth)
- Axios
- React Icons
- SweetAlert2
- Tailwind CSS & DaisyUI

### Backend & Database:
- Node.js
- Express.js
- Firebase Admin SDK (Token verification and server-side protection)
- MongoDB Atlas
- Stripe API 

### 🔑 Demo Admin Credentials (For Testing)
To test the Admin Dashboard features, you can log in using this pre-configured admin account:
- **Email:** admin@gmail.com
- **Password:** Admin102030+

## Deployment
- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Vercel (Optimized Serverless Architecture) 

## Server-Side-Repo: https://github.com/fuadhasan199/Boighor-Server.git 

