const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.port || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/social-media'
}

export default config