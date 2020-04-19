import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { connection } from '../utils/db';


export const TestimonialSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            trim: true,
            required: true,
        },
        state: {
            type: String,
            trim: true,
            required: true,
        },
        city: {
            type: String,
            trim: true,
            required: false,
        },
        interests: {
            type: Number,
            trim: true
        },
        media: {
            type: Array,
            trim: true,
            required: true,
                photo: [],
                video: [],
                audio: [],
        }
    },
    {
        collection: 'testimonials',
    }
);



TestimonialSchema.plugin(timestamps);

TestimonialSchema.index({ createdAt: 1, updatedAt: 1 });



export const Testimonial = connection.model('Testimonial', TestimonialSchema);
export const TestimonialTC = composeWithMongoose(Testimonial);