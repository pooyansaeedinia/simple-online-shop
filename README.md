# Simple Shop

A Django-based e-commerce web application for managing and selling products online. This project provides a complete shopping experience with user authentication, product catalog, shopping cart, and order management.

## Live Demo
- **click here**: https://simple-online-shop-zym1.onrender.com

## Features

### Current Features

- **User Authentication & Management**
  - User registration with email verification
  - Login and logout functionality
  - Password reset via email
  - Custom user model with unique email constraints

- **Product Management**
  - Product catalog with categories and brands
  - Product detail pages with descriptions and images
  - Product search functionality
  - Product filtering by category
  - Stock quantity management

- **Shopping Cart**
  - Add products to cart
  - Update item quantities
  - Remove items from cart
  - Real-time price calculations (including discounts)
  - Stock validation during checkout

- **Order Processing**
  - Checkout process with customer information collection
  - Payment method selection (Online / Cash on Delivery)
  - Order creation and confirmation
  - Automatic inventory reduction after order completion

- **Product Discounts**
  - Time-based discount system
  - Discount expiration management
  - Automatic price calculation with discounts applied

- **Product Reviews & Ratings**
  - Product rating system (1-5 stars)
  - User comments on products
  - One comment per user per product
  - Average rating calculation

- **Homepage Features**
  - Promotional banners with expiration dates
  - Featured products display
  - New products section
  - Discounted products showcase

- **Contact System**
  - Contact form for customer inquiries
  - Email notifications for contact submissions

- **Django Admin Panel**
  - Built-in admin interface for managing:
    - Products, Categories, Brands
    - Banners and Discounts
    - Orders and Cart items
    - User accounts

## Technology Stack

- **Backend:** Django 5.2.8
- **Database:** SQLite (development)
- **Image Processing:** Pillow 12.0.0
- **API Framework:** Django REST Framework 3.16.1
- **Authentication:** Django's built-in authentication system

## Project Structure

```
simple_shop/
├── accounts/          # User authentication and management
├── product_app/       # Products, categories, brands, comments
├── cart/             # Shopping cart and order management
├── home_app/         # Homepage, banners, discounts
├── contact/          # Contact form functionality
├── simple_shop/      # Project settings and configuration
├── templates/        # Base templates
├── static/           # Static files (CSS, JS, images)
└── media/            # User-uploaded media files
```

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple_shop
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create a superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Configure email settings** (optional, for email verification and password reset)
   - Edit `simple_shop/settings.py` and update the email configuration:
     ```python
     EMAIL_HOST = 'smtp.gmail.com'
     EMAIL_PORT = 587
     EMAIL_USE_TLS = True
     EMAIL_HOST_USER = 'your-email@gmail.com'
     EMAIL_HOST_PASSWORD = 'your-app-password'
     ```

8. **Run the development server**
   ```bash
   python manage.py runserver
   ```

9. **Access the application**
   - Frontend: http://127.0.0.1:8000/
   - Admin panel: http://127.0.0.1:8000/admin/

## Usage

### For Administrators

1. Log in to the admin panel at `/admin/`
2. Manage products, categories, and brands
3. Create and manage promotional banners
4. Set up product discounts with expiration dates
5. View and manage orders

### For Customers

1. **Browse Products**
   - Visit the homepage to see featured products
   - Browse by category
   - Search for specific products
   - View product details, ratings, and reviews

2. **Shopping**
   - Register or log in to your account
   - Add products to your cart
   - Review and update cart items
   - Proceed to checkout

3. **Place Orders**
   - Fill in shipping information
   - Select payment method
   - Confirm order

## Future Development Plans

The following features are planned for future releases to enhance the application:

### UI/UX Improvements
- Modern, responsive design with improved mobile experience
- Enhanced product image galleries and zoom functionality
- Better navigation and search interface
- Improved loading states and user feedback
- Dark mode support
- Advanced filtering and sorting options

### Admin Panel Enhancements
- Custom admin dashboard with analytics and statistics
- Order management interface with status tracking
- Inventory management tools
- Sales reports and analytics
- Bulk product import/export functionality
- Advanced discount management system

### User Panel/Dashboard
- User profile management
- Order history and tracking
- Wishlist functionality
- Saved addresses for faster checkout
- Review management (edit/delete own reviews)
- Notification system for order updates

### Management Features
- Order status workflow (Pending, Processing, Shipped, Delivered, Cancelled)
- Payment gateway integration
- Inventory alerts for low stock
- Customer management tools
- Email notification templates
- Multi-language support
- SEO optimization tools

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please use the contact form in the application or open an issue in the repository.

