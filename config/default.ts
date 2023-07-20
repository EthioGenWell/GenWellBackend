import dotenv from 'dotenv';

dotenv.config();

const dev = {
  app: {
    host: 'localhost',
    port: process.env.SERVER_PORT || 8001,
    REDIS_URL:
      process.env.REDIS_URL ||
      `${process.env.REDIS_HOST}://${process.env.REDIS_USER}:${process.env.REDIS_PORT}`,
    NODE_ENV: process.env.NODE_ENV,
  },
  db: {
    username = process.env.MONGO_USERNAME,
    password = process.env.MONGO_PASSWORD,
    host = process.env.MONGO_DB_HOST || 'localhost',
  },
};

export default dev;
