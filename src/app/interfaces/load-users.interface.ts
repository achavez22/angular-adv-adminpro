import { User } from "../models/usuario.model";

export interface LoadUsers { 
    total: number, 
    usuarios: User[]
}