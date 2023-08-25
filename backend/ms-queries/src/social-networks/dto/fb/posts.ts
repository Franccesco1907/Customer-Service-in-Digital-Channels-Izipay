export interface FacebookRestResponse {
    data:   any[];
}

export interface Post {
    created_time: string;
    message:      string;
    id:           string;
}

export interface Comment {
    created_time: string;
    from:         From;
    message:      string;
    id:           string;
}

export interface From {
    name: string;
    id:   string;
}

export interface AnswerCommentPost{
    id: string; //new comment id
}