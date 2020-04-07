import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;

const options = {
    autoIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true,
}

export const connection = mongoose.createConnection(process.env.MONGODB_URI, options);
/**

connection.on('connected', () => {
    console.log('connected to mongodb');
});
connection.on('disconnected', () => {
    console.log('connection disconnected');
}); 

*/

export const connectionLocation = mongoose.createConnection(process.env.MONGODB_URI_LOCATION, options);
    

mongoose.set('useCreateIndex', true);




