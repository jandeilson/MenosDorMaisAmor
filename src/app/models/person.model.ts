import { Testimonial } from 'src/app/models/testimonial.model';
import { Deserializable } from 'src/app/models/deserializable.model';

export class Person implements Deserializable {
    id: Number;
    name: String;
    email: String;
    phone: Number;
    testimonial?: Testimonial[];

    deserialize(input: any): this {
        // Assign input to our object BEFORE deserialize our testimonials to prevent already deserialized testimonials from being overwritten.
        Object.assign(this, input);
    
        // Iterate over all testimonials for our user and map them to a proper `Testimonial` model
        this.testimonial = input.testimonial.map(testimonial => new Testimonial().deserialize(testimonial))[0];
    
        return this;
    }
}