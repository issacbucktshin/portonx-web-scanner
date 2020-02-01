export class UserModel{
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    enabled: boolean = true;
    requiredActions: string[];
    credentials: any[];
  
}