import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { connection }  from '../utils/db';

export const UserSchema = new Schema({
    
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
    },
    phone: {
        type: Number,
        trim: true,
        required: true,
    },
    helper: {
        type: Boolean,
        required: false,
    }
},
{ 
    collection: 'users' 
}
);


UserSchema.plugin(timestamps);

UserSchema.index({ createdAt: 1, updatedAt: 1 });


export const User = connection.model('User', UserSchema);
export const UserTC = composeWithMongoose(User);