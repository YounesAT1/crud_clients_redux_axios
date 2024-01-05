# Client Management using _create-react-app_

## Description

### This React application allows users to manage clients, including functionalities to add, update, and delete clients, search clients by full name, see the total number of clients, and receive notifications for successful or erroneous operations.

## Technologies Used

- React
- React Hot Toast (for notifications)
- Axios (for API requests)
- Redux & Redux Toolkit
- Redux Thunk (for asynchronous actions)
- Redux Logger (for debugging)
- JSON Server (for mock API)
- React Router DOM (for routing)
- Tailwind CSS (for styling)

## Setup Instructions

### 1- Clone the repository

```
git clone https://github.com/YounesAT1/crud_clients_redux_axios.git
```

### 2- Install Dependencies

```
npm install
```

### 3- Run in the terminal

```
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process
```

### 4- Start the JSON web server API

```
json-server --watch src\data\db.json --port 3004
```

### 5- Start React App

```
npm start
```

## Usage

- Upon starting the app, navigate to `http://localhost:3000` in your browser.
- You can perform the following actions:
- **Add a Client:** Click on the "Add Client" button and fill in the required client information. If any field is missing, an error notification will appear.
- **Update a Client:** Click on the "Edit" button beside a client entry to update their information.
- **Delete a Client:** Click on the "Delete" button beside a client entry. A confirmation dialog will appear before deletion.
- **Search by Full Name:** Use the search bar to look for clients by their full name. If no clients exist, the table will display "No clients."

  ```
  
   
  
   
