export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  storageUsed?: number; // Optional property for storage usage
}

export interface UserLogin{
  email:string;
  password:string;
}