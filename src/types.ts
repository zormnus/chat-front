export interface IChat {
  uuid: string;
  created_at: string;
}

export interface ChatMessage {
  body: string;
  created_by__username: string;
  created_at: string;
}

export interface ChatMessageResponse {
  messages: ChatMessage[];
}

export interface LoginFields {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
