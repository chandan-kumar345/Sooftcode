import mongoose from 'mongoose';

const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sooftcode';
  
  try {
    const conn = await mongoose.connect(dbUri);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] Connection Error: ${error.message}`);
    console.log('[Database] Retrying database connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
