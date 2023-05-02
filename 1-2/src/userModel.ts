import { LocalStorageService, ORM } from "./ORM";

interface UserSchema {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export default new ORM<UserSchema>("users");
