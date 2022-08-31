const mqtt = require("mqtt")
const sendToAnalyzer = require("./rules")
const { MQTT } = require("../constants")

const client = mqtt.connect(MQTT.BROKER)
let data = []

client.on('connect', function () {
  client.subscribe(MQTT.TOPICS.RAW, function (err) {
    if (!err) {
      client.publish(MQTT.TOPICS.INFO, 'Aggregator Service Connected Successfully!')
    }
  })
})

client.on('message', function (topic, message) {
  const processedMessage = JSON.parse(message.toString())
  data.push(processedMessage)

  if (sendToAnalyzer(data)) client.publish(MQTT.TOPICS.ANALYSIS, JSON.stringify(processedMessage))
})

setInterval(() => {
  if (data.length > 0) {
    client.publish(MQTT.TOPICS.UPLOAD, JSON.stringify(data))
  }
}, 2 * 60000)

console.log("Aggregator Service Started");
