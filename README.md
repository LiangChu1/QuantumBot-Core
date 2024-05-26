# QuantumBot Core

## Description
QuantumChat Bot is a revolutionary project designed to address the challenges of modern communication. In today’s fast-paced world, individuals and teams often struggle with maintaining effective communication due to the barriers of distance and disconnection. This can lead to a lack of synchronization and productivity, hindering the success of collaborative endeavors.

The QuantumChat Bot project aims to overcome these obstacles by providing a platform for instantaneous and continuous dialogue. This platform is not just a chatbot; it’s a comprehensive solution designed to facilitate real-time interactions, ensuring the reliability and speed of communications on the platform.

The project leverages Firebase’s robust backend solutions to handle large volumes of real-time data with minimal latency. One of the key components of this backend is Cloud Firestore, a scalable database solution that ensures data consistency and reliability across all user interactions. This integration allows QuantumChat Bot to operate efficiently across various devices and networks without sacrificing speed or user experience.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm
- Firebase CLI
- Firebase Functions
- Firebase Firestore Database
- Postman

### Installing

1. Create a Firebase project through the Firebase console (make sure to also change the price plan to blaze "pay-to-go" plan)
2. Open up a new terminal and begin with cloning the repository: `git clone <repository-url>`
3. Navigate into the root project directory: `cd Rex-chatbot`
4. Install dependencies: `npm install`
5. Log in to Firebase CLI: `firebase login`
6. Initialize Firebase: `firebase init`
7. Select `Firestore` as the database and `Functions` as the setup for the api endpoints
8. Select the option to use an existing project and to select the project that you created beforehand
9. Hit enter to access the firestore rules as well as enter `y` to overwrite the current version to fit with the project you have
10. Select javascript as the language and then hit enter for the rest of the options.

## Workflow diagram
![workflow](QuantumBotCoreWorkFlow.drawio.png)

## Usage

The project includes the following Firebase Cloud Functions:

### user session management APIs
- `login`: Logs in a user.
- `logout`: Logs out a user.
- `register`: Registers a new user.
- `updateUserId`: Updates a user's ID.

### message recepition APIs
- `postMessage`: Posts a new message to a chat.
- `getChat`: Retrieves all messages from a specific chat of a specific user.
- `deleteChat`: Deletes all messages from a specific chat of a specific user.

### log management APIs
- `postLogs`: Posts a new log event for monitoring and troubleshooting.
- `updateLogs`: Updates an existing log event.
- `deleteLogs`: Deletes a log event  based on its id.
- `getLogs`: Retrieves a specific log event based on its id.

## Deployment

To deploy the functions to Firebase, run: `firebase deploy --only functions`

## Testing

In regards to how I when about testing my Firebase Functions, I used Postman and created API requests via HTTP to help ensure that my functions are robust and rebeliable before deployment. For the POST and PUT methods, I tested them by first pasting the http link given by said function within the firebase console, then added a key-value pair header for the Content-type (in that it was application/json), and then added the data body of said request as a raw json object. For the DELETE and GET methods, I tested them by first pasting the http link given by said function within the firebase console, and then added the neccessary query parameters to said http link as a key-value pair. Once, I created my tested, then I clicked the send button to ensure that the Firebase function works as expected. Here's a link to the Postman workspace that I created to test out the different Cloud functions: https://www.postman.com/descent-module-astronomer-60072393/workspace/rex-chatbot-testing/collection/27615271-3a19dec5-23d0-4043-9173-e63235851fdb?action=share&creator=27615271
