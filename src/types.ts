export interface IRoom {
  id: number;
  title: string;
}

export interface LoginFields {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
