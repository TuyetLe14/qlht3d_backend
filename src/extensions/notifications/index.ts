import FCM from 'fcm-node'
import { getMessaging } from 'firebase-admin/messaging'

var admin = require('firebase-admin')
var serviceAccount = require('../../../ultrasonic_fcm_config.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const subscribeToTopic = async (deviceTokens: string, topic: string) => {
  const serverKey = process.env.FCM_KEY || ''
  const fcm = new FCM(serverKey)
  await fcm.subscribeToTopic([`${deviceTokens}`], topic, (err, res) => {
    if (err) {
      console.log(err)
    }
  })
}
const unsubscribeFromTopic = async (deviceTokens: string, topic: string) => {
  const serverKey = process.env.FCM_KEY || ''
  const fcm = new FCM(serverKey)
  await fcm.unsubscribeToTopic([`${deviceTokens}`], topic, (err, res) => {
    if (err) {
      console.log(err)
    }
  })
}
const sendNotification = async (topic: string, title: string, body: string) => {
  const serverKey = process.env.FCM_KEY || ''
  const fcm = new FCM(serverKey)
  const message = {
    to: `/topics/${topic}`,
    notification: {
      title,
      body,
    },
  }
  await fcm.send(message, (err, res) => {
    if (err) {
      console.log(err)
    }
  })
}

const sendnotitomobile = async (registrationToken: string, title, body, notification: { title: string, body: string } = { title: "", body: "" }) => {
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
  }
  console.log(message)
  // Send a message to the device corresponding to the provided
  // registration token.
  getMessaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });

}


export default { subscribeToTopic, unsubscribeFromTopic, sendNotification, sendnotitomobile }
