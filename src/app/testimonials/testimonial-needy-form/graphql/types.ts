export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
}

export class Testimonial {
    user: string;
    text: string;
    state: string;
    city: string;
    media?: { 
        photo: [], 
        video: [], 
        audio: [] 
    };
}