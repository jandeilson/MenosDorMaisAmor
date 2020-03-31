import { Testimonial } from 'src/app/models/testimonial.model';
import { Deserializable } from 'src/app/models/deserializable.model';

export class Person implements Deserializable {
    id: number;
    name: string;
    email: string;
    phone: number;
    testimonial?: Testimonial[];

    deserialize(input: any): this {
        // Assign input to our object BEFORE deserialize our testimonials to prevent already deserialized testimonials from being overwritten.
        Object.assign(this, input);
    
        // Iterate over all testimonials for our user and map them to a proper `Testimonial` model
        this.testimonial = input.testimonial.map(testimonial => new Testimonial().deserialize(testimonial))[0];
    
        return this;
    }
}