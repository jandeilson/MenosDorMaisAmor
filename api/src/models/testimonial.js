import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';


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
        media: {
            type: Array,
            photo: {
                type: Array
            },
            video: {
                type: Array
            },
            audio: {
                type: Array
            },
            trim: true,
            required: true
        }
    },
    {
        collection: 'testimonials',
    }
);

TestimonialSchema.plugin(timestamps);

TestimonialSchema.index({ createdAt: 1, updatedAt: 1 });



export const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
export const TestimonialTC = composeWithMongoose(Testimonial);