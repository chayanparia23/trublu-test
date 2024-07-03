import { Role } from "../enums/role.enum";

export interface User {
    id: string;
    name: string;
    isActive: boolean;
    empId: number;
    gender: string;
    age: number;
    email: string;
    address: string;
    phone: number;
    role: Role;
    profession: string;
    userId: string;
    ranking: number;
    skills?: string[];
    workLinks?: string[];
    photoUrl?: string;
    password: string;
    
}