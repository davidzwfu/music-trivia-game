export class Response {
    error: boolean;
    data: string;
}

export class Card {
    year: number;
    artist: Artist;
    type: string;
    paused: boolean = false;
    answer: string = "";
    image: string = "";
}

export class Artist {
    name: string;
    id: string;
    uri: string;
    genres: string[];
}

export class Toast {
    content: string;
    style: string;

    constructor(content, style = 'info') {
        this.content = content;
        this.style = style;
    }
}

export class Student {
    id: number;
    email: string = '';
    password: string = '';
    first_name: string = '';
    last_name: string = '';
    full_name: string = '';
    dob: string = '';
    country: string = '';
    city: string = '';
    address: string = '';
    phone: string = '';
    description: string = '';
}

export class Education {
    id: number;
    uid: number;
    name: string;
    from: string;
    to: string;
}

export class Award {
    id: number;
    uid: number;
    event: string;
    name: string;
    date: string;
    upload: string;
    rating: number;
}

export class Experience {
    id: number;
    uid: number;
    company: string;
    title: string;
    from: string;
    to: string;
}

export class Search {
    id: number;
    name: string;
    type: string;
    description: string;
}
