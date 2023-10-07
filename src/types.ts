export interface IChat {
  uuid: string;
  created_at: string;
}

export interface LoginFields {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
