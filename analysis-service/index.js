const mqtt = require("mqtt")
const getCmd = require("./getCommand")
const { MQTT } = require("../constants")

const client = mqtt.connect(MQTT.BROKER)

client.on('connect', function () {
  client.subscribe(MQTT.TOPICS.ANALYSIS, function (err) {
    if (!err) {
      client.publish(MQTT.TOPICS.INFO, 'Analysis Service Connected Successfully!')
    }
  })
})

client.on('message', function (topic, message) {
  const processedMessage = JSON.parse(message.toString())
  const cmd = getCmd(processedMessage)
  if (cmd != "None") client.publish(MQTT.TOPICS.MOTOR, cmd)
})

console.log("Analysis Service Started");
