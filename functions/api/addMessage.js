// Import the Firebase Functions module
const functions = require("firebase-functions");
// Import the Firebase Admin SDK
const admin = require("firebase-admin");
// Destructure the logger from functions
const {logger} = functions;

/**
 * Cloud Function to add a message to a chat.
 * @param {Object} data contains the message text and user ID.
 * @param {Object} context The context object for the function call.
 * @returns {Object} shows status of operation and ID of the added message.
 * @throws {functions.https.HttpsError} - If required fields are missing or an error occurs while adding the message.
 */
exports.addMessage = functions.https.onCall(async (data, context) => {
  try {
    logger.log("Received message request data:", data);

    // Check if the required fields (text and userId) are missing
    if (!data.text || !data.userId) {
      logger.log("Required fields (text or userId) are missing");
      // Throw an HTTP error for missing fields
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Required fields (text or userId) are missing",
      );
    }

    // Destructure the text and userId from the data object
    const {text, userId} = data;

    // Create an object with the message data and include the current timestamp
    const messageData = {
      text,
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Add the message data to the Firestore database
    const messageRef = await admin
        .firestore()
        .collection("chats")
        .doc(userId)
        .collection("messages")
        .add(messageData);

    // Return a success message along with the ID of the newly added message
    return {status: "success", messageId: messageRef.id};
  } catch (error) {
    logger.log("Error adding message: ", error);
    // Throw an HTTP error with status "unknown" if an error occurs
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while adding the message",
        error.message,
    );
  }
});
