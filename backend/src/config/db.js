import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sooftcode';
  
  try {
    const conn = await mongoose.connect(dbUri);
    logger.info(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`[Database] Connection Error: ${error.message}`);
    logger.warn('[Database] Retrying database connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
