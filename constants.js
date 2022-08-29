module.exports = {
  MQTT: {
    TOPICS: {
      INFO: "",
      REGISTER: "",
      UPLOAD: "",
      MOTOR: "",
      RAW: "",
      ANALYSIS: ""
    },
    BROKER: "mqtt://broker.emqx.io"
  },
  AWS_SERVICES: {
    ACCESS_KEY: process.env.ACCESS_KEY || "",
    SECRET: process.env.SECRET || "",
    S3_BUCKET_NAME: ""
  }
}