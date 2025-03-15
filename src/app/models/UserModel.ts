export interface UserModel {
  _id:string
  name:string
  validTo:Date
  email: string;
  roles:string[]
  token:string

}
