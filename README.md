# 📚 Topmann Bookshop – E-commerce Web Application (Prototype)

Topmann Bookshop is an e-commerce web application built for selling books online. It supports key e-commerce functions such as user authentication, product catalog, shopping cart, checkout, and order management.

---

## 🏗️ System Architecture Overview

The application follows a modular and scalable architecture. A system architecture diagram is attached to visually represent how the components interact.

### 📌 Architecture Layers:

#### 1. Frontend (Client-side)
- Runs in the web browser
- Built using React.js as frontend framework
- Handles user interface and interactions

#### 2. Backend Services
- Handles business logic and data flow
- Connects to Firebase for authentication, data storage, and file management

#### 3. Firebase Services (Server-side)
- Authentication: Handles user login, registration, password reset
- Firestore Database: Manages product catalog, orders, users, carts
- Firebase Storage: For uploading product images
- Cloud Functions (planned): For automation and secure backend logic

#### 4. Payment Gateway Integration
- Processes online payments
- Handles success and failure responses
- Uses API connectivity for transaction verification (e.g., Flutterwave, Paystack – to be decided)

#### 5. External APIs
- Future integrations may include: order shipping APIs, book info APIs, etc.

---

## 🧩 Key Functional Pages (Implemented / Planned)

### 🛍️ Storefront
- Home Page
- Product List & Detail Pages
- Cart Page
- Checkout Page
- Order Confirmation
- Search, Category & Subcategory Pages

### 👤 User Account
- Login, Register, Forgot Password
- Profile Management
- Account Dashboard
- Order History
- Order Tracking

### 📄 Info & Support
- About Us
- Contact Us
- FAQ
- Terms & Conditions
- Privacy Policy
- Shipping & Returns
- Payment Failure
- Maintenance
- 404 Error

---

## 🔧 Backend: Firebase Services

| Service           | Purpose                            |
|------------------|------------------------------------|
| Firebase Auth     | Login, registration, role handling |
| Firestore         | Store data for products, orders, users |
| Firebase Storage  | Store product images               |
| Cloud Functions   | (Planned) Backend automation tasks |
| Firebase Hosting  | (Optional) Frontend deployment     |

---

## 🔨 Technologies Used

- Frontend: HTML, CSS, JavaScript (React recommended)
- Backend: Firebase (Auth, Firestore, Storage)
- Version Control: Git + GitHub

---

## 📎 Current Status

This is an active prototype for a real business (Topmann Bookshop). The backend structure is functional but still being expanded. Future work will focus on:
- Payment gateway integration
- Admin panel/dashboard
- Order email notifications

---

## 📁 Included Artifacts

- ✅ Firebase-connected backend structure  
- ✅ Functional UI-linked pages  
- ✅ System Architecture Diagram (see attached JPEG)
