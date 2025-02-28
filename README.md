# E-Commerce Website

An e-commerce platform providing seamless shopping experience with robust features including product management, user authentication, and product reviews.

---

## 🚀 Features

- 🛍️ **Product Management:** Browse, search, and filter products by categories.
- 👤 **User Authentication:** Secure login and registration (JWT-based).
- 📝 **Product Reviews:** Leave reviews and ratings on products.
- 🛒 **Shopping Cart:** Add, remove, and manage cart items.

---

## 🧰 Tech Stack

**Frontend:** React.js, Tailwindcss 
**Backend:** Node.js, Express  
**Database:** MongoDB  
**Authentication:** JSON Web Tokens (JWT)  


## 💻 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/isaaclimlim/E-commerce-MERN-Project.git
cd E-commerce-MERN-Project
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory with the following content:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. **Start MongoDB:**

```bash
mongod
```

5. **Run the application:**

```bash
npm start
```

The application will be accessible at `http://localhost:5000`.

---

## 🔗 API Endpoints

### **Products**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Add a new product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)

### **Users**
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (Authenticated users)

### **Reviews**
- `POST /api/products/:id/review` - Add a review for a product (Authenticated users)

---

## ⚙️ Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon for development

---
