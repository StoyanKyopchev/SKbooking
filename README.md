https://github.com/StoyanKyopchev/SKbooking/assets/115925638/70c32e80-6bb9-46b3-85f9-6c42b198c515

# SK Booking

SK Booking is a user-friendly and fully responsive hotel booking app. Find great hotel deals, schedule the dates of your stay, make a secure payment and have your room booked in just a few minutes. As a hotel owner you can add or edit the details and pictures of your hotel in our database and have it listed in no time.

## Built with

- `MongoDB`
- `Express.js`
- `React`
- `Node.js`
- `TypeScript`
- `Tailwind CSS`
- `Stripe`

## Getting Started

This section will walk you through the process of setting up the SKbooking App on your local machine.

## Prerequisites

Please make sure that you have Node.js v18.17.1 (or higher) installed on your machine.

## Clone the Repository

```sh
git clone https://github.com/StoyanKyopchev/SKbooking.git
```

## Backend Configuration

1. Navigate to the `backend` folder and create a file called `.env`. Once done, add the following content in it:

```plaintext
MONGODB_CONNECTION_STRING=

ACCESS_TOKEN_SECRET=
CLIENT_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_API_KEY=
```

2. **MongoDB setup**

- Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
- Select the M0 FREE option and the region that is closest to your location.
- Next, copy/write down the username and password that are provided to you after building the database and click the "Create User" button. Click the "Add My Current Ip Address" button and then "Fisnih and Close".
- Next, click on the "Database" section in the menu on the left side of your screen and you should see the database that you created. Click on the "Connect" button that is next to the name of your database and select the "Drivers" option.
- Copy the provided connection string and add it to the `MONGODB_CONNECTION_STRING` variable in the `.env` file that you created earlier. Do not forget to replace `<password>` with the password that you copied/wrote down earlier.

3. **ACCESS_TOKEN_SECRET**

- This just needs to be a long, random string. You can use some online secret key generator as well.

4. **CLIENT_URL**

- The `CLIENT_URL` should point to the URL where your frontend application is running (if you are running it locally, it will most likely be `http://localhost:3000` or `http://localhost:5173`).

5. **Cloudinary setup**

- Create an account at [Cloudinary](https://cloudinary.com/).
- Once logged in, go to the "Dashboard" section in the menu on the left side of your screen where you will find the Cloud Name, API key and API secret.
- Copy the provided details from the Dashboard to the respective `CLOUDINARY_` variable in the `.env` file that you created earlier.

6. **Stripe Setup**

- Create an account at [Stripe](https://stripe.com/).
- Once logged in, go to the "Developers" section in the top right corner of your screen.
- Next, click on the "API keys" section at the top menu and copy the "Secret key".
- Add your Stripe API key to the `STRIPE_API_KEY` variable in the `.env` file that you created earlier.

## Frontend Configuration

1. Navigate to the `frontend` folder and create a file called `.env`. Once done, add the following content in it:

```plaintext
VITE_SERVER_BASE_URL=http://localhost:5000

VITE_STRIPE_PUB_KEY=
```

2. **VITE_STRIPE_PUB_KEY**

- The `VITE_STRIPE_PUB_KEY` should point to the Stripe Publishable key which you can get from the "Developers -> API keys" section at the top menu in Stripe.

## Running the Application

1. **Backend**:

- Navigate to the `backend` directory.
- Install the dependencies: `npm install`.
- Start the server with: `npm run dev`.

2. **Frontend**:

- Open a new terminal and navigate to the `frontend` directory
- Install the dependencies: `npm install`.
- Start the frontend application: `npm run dev`.
- The application should be running on `http://localhost:5173`, but you can also verify this in your terminal.
