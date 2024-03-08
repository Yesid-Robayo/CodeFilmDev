
export interface UserData {
    username: string;
    password: string;
}

export interface VideoDetails {
    name: string;
    review: string;
    category: string;
    thumbnail: File | null;
    videoFile: File | null;
}

export interface MessageProps {
    question: string;
    onAccept: () => void;
    onCancel: () => void;
}

export interface userData {
    name: string;
    email: string;
    dateOfBirth: string;
    username: string;
    password: string;
}

export interface VideosResponse {
    id: string;
    data: {
        name: string;
        review: string;
        category: string;
        createdAt: string;
        thumbnailURL: string;
        videoURL: string;
        autor: string;
    };
}