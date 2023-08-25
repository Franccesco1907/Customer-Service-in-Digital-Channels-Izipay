export interface FacebookMessageEntry {
    object: string; //object where it was send (page, ig, whats)
    entry:  PageMessageEntry[];
}

export interface PageMessageEntry {
    id:        string; //page_id
    time:      number; //in timestamp
    messaging: Messaging[];
}

export interface Messaging {
    sender:    Recipient; 
    recipient: Recipient; //page
    timestamp: number;
    message:   Message;
}

export interface Message {
    mid:  string; //id of message
    text: string; //message itself
}

export interface Recipient {
    id: string;
}