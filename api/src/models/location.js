import mongoose, { Schema } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { connectionLocation } from '../utils/db'

export const stateSchema = new Schema({
    
    _id: {
        type: String,
    },
    initials: {
        type: String,
    },
    name: {
        type: String,
    }
},
{ 
    collection: 'states' 
}
);


export const State = connectionLocation.model('state', stateSchema);
export const StateTC = composeWithMongoose(State);