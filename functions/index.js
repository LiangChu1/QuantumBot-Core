// Initialize Firebase Admin SDK
const admin = require("firebase-admin");
admin.initializeApp();

// Import message-related functions
const {
  postMessage,
  getChat,
  deleteChat,
} = require("./api/messages");

// Export message-related functions
exports.postMessage = postMessage;
exports.getChat = getChat;
exports.deleteChat = deleteChat;

// Import user-related functions
const {
  login,
  logout,
  register,
  updateUserId,
} = require("./api/users");

// Export user-related functions
exports.login = login;
exports.logout = logout;
exports.register = register;
exports.updateUserId = updateUserId;

// Import log-related functions
const {
  postLogs,
  updateLogs,
  deleteLogs,
  getLogs,
} = require("./api/logs");

// Export log-related functions
exports.postLogs = postLogs;
exports.updateLogs = updateLogs;
exports.deleteLogs = deleteLogs;
exports.getLogs = getLogs;

// Import and export addMessage function
const {addMessage} = require("./api/addMessage");
exports.addMessage = addMessage;
