
import { Deserializable } from 'src/app/models/deserializable.model';

export class Testimonial implements Deserializable {
    id: Number;
    created: Number;
    state: String;
    text: String;
    media: {
        photos: any[];
        videos: any[];
        audios: any[];
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
