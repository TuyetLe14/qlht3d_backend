"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fcm_node_1 = __importDefault(require("fcm-node"));
const messaging_1 = require("firebase-admin/messaging");
var admin = require('firebase-admin');
var serviceAccount = require('../../../ultrasonic_fcm_config.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const subscribeToTopic = async (deviceTokens, topic) => {
    const serverKey = process.env.FCM_KEY || '';
    const fcm = new fcm_node_1.default(serverKey);
    await fcm.subscribeToTopic([`${deviceTokens}`], topic, (err, res) => {
        if (err) {
            console.log(err);
        }
    });
};
const unsubscribeFromTopic = async (deviceTokens, topic) => {
    const serverKey = process.env.FCM_KEY || '';
    const fcm = new fcm_node_1.default(serverKey);
    await fcm.unsubscribeToTopic([`${deviceTokens}`], topic, (err, res) => {
        if (err) {
            console.log(err);
        }
    });
};
const sendNotification = async (topic, title, body) => {
    const serverKey = process.env.FCM_KEY || '';
    const fcm = new fcm_node_1.default(serverKey);
    const message = {
        to: `/topics/${topic}`,
        notification: {
            title,
            body,
        },
    };
    await fcm.send(message, (err, res) => {
        if (err) {
            console.log(err);
        }
    });
};
const sendnotitomobile = async (registrationToken, title, body, notification = { title: "", body: "" }) => {
    const message = {
        notification,
        android: {
            ttl: 86400,
            notification: {
                title: title,
                body: body,
                color: "#8a8618"
            },
        },
        token: registrationToken,
    };
    console.log(message);
    // Send a message to the device corresponding to the provided
    // registration token.
    (0, messaging_1.getMessaging)().send(message)
        .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
        .catch((error) => {
        console.log('Error sending message:', error);
    });
};
exports.default = { subscribeToTopic, unsubscribeFromTopic, sendNotification, sendnotitomobile };
//# sourceMappingURL=index.js.map