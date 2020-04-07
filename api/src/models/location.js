import mongoose, { Schema } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { connectionLocation } from '../utils/db'

// State schema
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

// City schema
export const citySchema = new Schema({
    
    _id: {
        type: String,
    },
    name: {
        type: String,
    },
    state: {
        type: String,
    }
},
{ 
    collection: 'cities' 
}
);


export const City = connectionLocation.model('city', citySchema);
export const CityTC = composeWithMongoose(City);