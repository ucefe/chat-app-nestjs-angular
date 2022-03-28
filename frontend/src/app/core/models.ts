export interface User {
  id?: string,
  name: string,
  avatar: string,
}

export interface Message {
  type: 'text' | 'file' | 'map' | 'quote',
  messageContent: string,
  createDateTime: Date,
  reply: boolean,
  user: User
}

export interface MessagePayload {
  message: string;
  files: File[];
}
