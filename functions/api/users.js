// Import the Firebase Functions module
const functions = require("firebase-functions");
// Import the Firebase Admin SDK
const admin = require("firebase-admin");
// Destructure the logger from functions
const {logger} = functions;

/**
 * This function is responsible for logging in a user.
 * It expects an object with a `userId` property in the `data` parameter.
 * If the `userId` is missing, it throws an error.
 * If the user is successfully logged in, it returns an object with a status message.
 * @param {Object} data - The data for the user.
 * @param {Object} context - The context of the function call.
 * @returns {Object} - The status of the operation.
 * @throws {functions.https.HttpsError} - If required fields are missing or an error occurs while logging in.
 */
const login = functions.https.onCall(async (data, context) => {
  try {
    logger.log("Received user request data:", data);
    // Destructure the userId from the data object
    const {userId} = data;
    // Check if the userId is present in the data object
    if (!userId) {
      logger.log("Required fields are missing");
      // Throw an HTTP error for missing fields
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Required fields (userId) are missing",
      );
    }
    // Check if the user exists in the database
    const userRef = admin.firestore().collection("users").doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
      return {status: "User does not exist"};
    }
    // Checks/updates if the user is already logged in
    await userRef.update({loggedIn: true});
    // Return a success message after successfully updating the user data to database
    return {status: "User has successfully logged in"};
  } catch (error) {
    logger.log("Error logging in: ", error);
    // Throw an HTTP error for any other errors
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while logging in",
        error.message,
    );
  }
});

/**
 * This function is responsible for logging out a user.
 * It expects an object with a `userId` property in the `data` parameter.
 * If the `userId` is missing, it throws an error.
 * If the user is successfully logged out, it returns an object with a status message.
 * @param {Object} data - The data for the user.
 * @param {Object} context - The context of the function call.
 * @returns {Object} - The status of the operation.
 * @throws {functions.https.HttpsError} - If required fields are missing or an error occurs while logging out.
 */
const logout = functions.https.onCall(async (data, context) => {
  try {
    logger.log("Received user request data:", data);
    // Destructure the userId from the data object
    const {userId} = data;
    // Check if the userId is present in the data object
    if (!userId) {
      logger.log("Required fields are missing");
      // Throw an HTTP error for missing fields
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Required fields (userId) are missing",
      );
    }
    // Check if the user exists in the database
    const userRef = admin.firestore().collection("users").doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
      return {status: "User does not exist"};
    }
    // Checks/updates if the user is already logged out
    await userRef.update({loggedIn: false});
    // Return a success message after successfully updating the user data to database
    return {status: "User has successfully logged out"};
  } catch (error) {
    logger.log("Error logging out: ", error);
    // Throw an HTTP error for any other errors
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while logging out",
        error.message,
    );
  }
});

/**
 * This function is responsible for registering a user.
 * It expects an object with a `userId` property in the `data` parameter.
 * If the `userId` is missing, it throws an error.
 * If the user is successfully registered, it returns an object with a status message.
 * @param {Object} data - The data for the user.
 * @param {Object} context - The context of the function call.
 * @returns {Object} - The status of the operation.
 * @throws {functions.https.HttpsError} - If required fields are missing or an error occurs while registering.
 */
const register = functions.https.onCall(async (data, context) => {
  try {
    logger.log("Received user request data:", data);
    // Destructure the userId from the data object
    const {userId} = data;
    // Check if the userId is present in the data object
    if (!userId) {
      logger.log("Required fields are missing");
      // Throw an HTTP error for missing fields
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Required fields (userId) are missing",
      );
    }
    // Check if the user exists in the database
    const userRef = admin.firestore().collection("users").doc(userId);
    const doc = await userRef.get();
    if (doc.exists) {
      return {status: "User account already exists"};
    }
    // Create a new user document in the database
    await userRef.set({loggedIn: true});
    // Return a success message after successfully creating the user document
    return {status: "User has successfully registered"};
  } catch (error) {
    logger.log("Error registering: ", error);
    // Throw an HTTP error for any other errors
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while registering",
        error.message,
    );
  }
});

/**
 * This function is responsible for updating a user's ID.
 * It expects an object with `oldUserId` and `newUserId` properties in the `req.body.data`.
 * If either of these properties is missing, it throws an error.
 * If the user ID is successfully updated, it returns a status message.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The status of the operation.
 * @throws {functions.https.HttpsError} - If required fields are missing or an error occurs while updating the user ID.
 */
const updateUserId = functions.https.onRequest(async (req, res) => {
  try {
    logger.log("Received user request data:", req);
    // Destructure the oldUserId and newUserId from the data object
    const {oldUserId, newUserId} = req.body.data || {};
    // Check if the oldUserId and newUserId are present in the data object
    if (!oldUserId || !newUserId) {
      logger.log("Required fields are missing");
      // Throw an HTTP error for missing fields
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Required fields (old and new userId) are missing",
      );
    }
    // Check if the old user exists in the database
    const oldUserRef = admin.firestore().collection("users").doc(oldUserId);
    const oldDoc = await oldUserRef.get();
    if (!oldDoc.exists) {
      return {status: "User does not exist"};
    }
    // Check if the new user exists in the database. If it's not there, then the old user's info will be changed to the new info
    const newUserRef = admin.firestore().collection("users").doc(newUserId);
    await newUserRef.set({loggedIn: oldDoc.data().loggedIn});
    await oldUserRef.delete();

    // return success message after updating user info
    return res.status(200).json({status: "User has successfully updated"});
  } catch (error) {
    logger.log("Error updating user: ", error);
    // Throw an HTTP error for any other errors
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while updating user",
        error.message,
    );
  }
});

module.exports = {login, logout, register, updateUserId};
