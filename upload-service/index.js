const mqtt = require("mqtt")
const AWS = require("aws-sdk")
const { MQTT, AWS_SERVICES } = require("../constants")

const s3 = new AWS.S3({
  credentials: new AWS.Credentials(AWS_SERVICES.ACCESS_KEY, AWS_SERVICES.SECRET),
  apiVersion: '2006-03-01'
})

const globalBucketParams = {
  Bucket: AWS_SERVICES.S3_BUCKET_NAME,
};
const client = mqtt.connect(MQTT.BROKER)

client.on('connect', function () {
  client.subscribe(MQTT.TOPICS.UPLOAD, function (err) {
    if (!err) {
      client.publish(MQTT.TOPICS.INFO, 'Connected Successfully!')
    }
  })
})

client.on('message', function (topic, message) {
  const processedMessage = JSON.stringify(message.toString())
  const bucketParams = { ...globalBucketParams, Key: `${topic}.txt`, Body: Buffer.from(processedMessage) }

  s3.upload(bucketParams, (err, data) => {
    if (err) client.publish(MQTT.TOPICS.INFO, JSON.stringify(err))
    else client.publish(MQTT.TOPICS.INFO, JSON.stringify(data))

    console.log(`Successfully uploaded to ${data.Location}`)
  })
})

console.log("Upload Service Started");
