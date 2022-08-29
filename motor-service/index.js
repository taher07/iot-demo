const mqtt = require("mqtt")
const { MQTT } = require("../constants")

const client = mqtt.connect(MQTT.BROKER)

client.on('connect', function () {
  client.subscribe(MQTT.TOPICS.MOTOR, function (err) {
    if (!err) {
      client.publish(MQTT.TOPICS.INFO, 'Motor Service Connected Successfully!')
    }
  })
})

client.on('message', function (topic, message) {
  const processedMessage = message.toString()

  if (processedMessage == "Start Motor") {
    console.log("Motor Started")
  }
})

console.log("Motor Service Started");
