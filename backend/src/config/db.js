import mongoose from 'mongoose';

let mongoServer;
export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (uri) {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
    return;
  }
  // Dynamic import to handle CJS/ESM differences and avoid static resolution issues
  let MongoMemoryServer;
  try {
    const mod = await import('mongodb-memory-server');
    MongoMemoryServer = mod.MongoMemoryServer ?? mod.default?.MongoMemoryServer ?? mod.default;
  } catch (e) {
    const { createRequire } = await import('module');
    const require = createRequire(import.meta.url);
    MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
  }

  // Fallback to in-memory MongoDB for local development when MONGO_URI is not provided
  mongoServer = await MongoMemoryServer.create();
  const inMemoryUri = mongoServer.getUri();
  await mongoose.connect(inMemoryUri);
  console.log('MongoDB (in-memory) connected');
};

export const stopInMemoryMongo = async () => {
  if (mongoServer) await mongoServer.stop();
};
