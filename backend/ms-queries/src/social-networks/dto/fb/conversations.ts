export interface Conversation {
    id:           string;
    link:         string;
    updated_time: string;
    messages: Messages;
    message_count: number;
}

export interface Messages {
    data:   Message[];
}

export interface Message {
    from:         From;
    message:      string;
    created_time: string;
    id:           string;
}

export interface From {
    name:  string;
    email: string;
    id:    string;
}

export interface AnswerMessagePost{
    recipient_id: string;
    message_id: string;
}