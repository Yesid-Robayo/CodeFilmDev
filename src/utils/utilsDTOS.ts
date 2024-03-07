
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