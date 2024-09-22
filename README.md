# Book Management Dashboard
## Frontend repo: https://github.com/zibranhasan/Electric-gadgets-management-system-frontend
## Live link: https://assignment-6-gilt-nine.vercel.app/
#### User Role 
**Email**: `user@gmail.com`  
**Password**: `123456`
#### Manager Role 
**Email**: `manager@gmail.com`  
**Password**: `123456`

Welcome to the **Book Management Dashboard** repository! This project provides a comprehensive solution for managing a book inventory, tracking sales, and analyzing sales history. It includes features such as authentication, CRUD operations, real-time UI updates, and advanced book filtering capabilities.

## Features

### Authentication
- **User Registration and Login:** Secure authentication using **JWT (JSON Web Tokens)**.
- **Role:** Single role setup for users responsible for managing the system.

### Book Management
- **CRUD Operations:**
  - Create, Read, Update, and Delete operations for managing books in the inventory.
- **Filtering System:** Robust filtering options including:
  - **Price:** Set a price range for books.
  - **Release Date:** Filter books based on release or publication date.
  - **Author:** Real-time search functionality for authors.
  - **ISBN:** Search books by International Standard Book Number (ISBN).
  - **Genre:** Filter books by genre.
  - **Publisher:** Filter books by publisher.
  - **Series:** Filter books by specific series.
  - **Language:** Filter books by language.
  - **Additional Filters:** Book format (hardcover, paperback, e-book), page count, etc.
- **Bulk Delete:** Efficiently manage inventory by selecting and deleting multiple books at once.

### Sales Management
- **Sell Books:**
  - Search for a book, sell it by specifying the quantity, buyer's name, and sale date.
  - The product is automatically removed from inventory when the stock reaches zero.

### Sales History
- **Categorized View:** View sales history by:
  - Daily
  - Weekly
  - Monthly
  - Yearly

### User Interface
- **Real-time Updates:** The UI gracefully updates in real-time when product inventory and sales information change.
- **Mobile Responsive:** Optimized for various devices to ensure a seamless user experience.

### State Management
- **Redux:** Utilized for state management to maintain application-wide consistency.

## Technical Details
- **RTK Query:** Efficiently handles API data fetching and caching for CRUD operations.
- **Re-fetching:** Ensures data accuracy and consistency by re-fetching data as needed.
- **Tags:** Implemented for improved organization and categorization of books.


### Running the Application

To start the application, use the following npm script:

```bash
npm start
