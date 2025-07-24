# SuperMarket Pro - React Native App

SuperMarket Pro is a mobile application built with React Native that allows supermarket staff to manage customer and item information efficiently. This application is designed to streamline in-store operations by providing a simple interface to view, add, edit, and delete customer and item records.

## Features

*   **Customer Management**:
    *   View a list of all customers.
    *   Add new customers with their name and email.
    *   Update existing customer information.
    *   Delete customers from the database.
*   **Item Management**:
    *   View a list of all available items in the supermarket.
    *   View details for each item, including name and price.
*   **User Authentication**:
    *   Secure login and registration for staff members.
*   **Image Uploads**:
    *   Upload images for customers and items.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (>=18)
*   npm or Yarn
*   React Native CLI
*   Android Studio or Xcode for running on an emulator/simulator or a physical device.

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/newSuperMarketProject.git
    cd newSuperMarketProject
    ```

2.  **Install dependencies:**

    Using npm:
    ```sh
    npm install
    ```

    Or using Yarn:
    ```sh
    yarn install
    ```

## Running the App

### 1. Start the Metro Bundler

In a terminal, run the following command:

```sh
npm start
```

### 2. Run on a Device or Emulator

#### Android

Open a new terminal and run:

```sh
npm run android
```

#### iOS

For iOS, you need to install the CocoaPods dependencies first:

```sh
cd ios
pod install
cd ..
```

Then, run the app:

```sh
npm run ios
```

## Main Dependencies

*   **React Native**: The core framework for building the app.
*   **React Navigation**: For handling navigation between screens.
*   **React Native Paper**: For UI components and theming.
*   **Axios**: For making HTTP requests to the backend API.
*   **AsyncStorage**: For local data storage.
*   **React Native Image Picker**: For selecting images from the device.

## API Endpoints

The application interacts with a backend API to manage data. The base URL for the API is `http://13.232.150.130:3000`.

*   **Authentication**:
    *   `POST /api/v1/users/login`
    *   `POST /api/v1/users/register`
*   **Customers**:
    *   `GET /api/v1/customers/get`
    *   `POST /api/v1/customers/delete/:id`
*   **Items**:
    *   `GET /api/v1/items/get`
*   **Image Uploads**:
    *   `GET /api/v1/uploads/images`
    *   `POST /api/v1/uploads`

---

This README provides a comprehensive overview of the SuperMarket Pro application, from its features to its setup and API documentation.
