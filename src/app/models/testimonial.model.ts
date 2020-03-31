
import { Deserializable } from 'src/app/models/deserializable.model';

export class Testimonial implements Deserializable {
    id: number;
    created:number;
    state: string;
    text: string;
    media: {
        photos: any[];
        videos: any[];
        audios: any[];
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
