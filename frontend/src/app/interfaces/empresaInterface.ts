import { Ciudad } from '../class/ciudad';

export interface empresaInterface{
    id?: number;
    nombre: string;
    direccion: string;
    ciudad_id: number;
    fono: string;
    email: string; 
    giro: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    ciudad: Ciudad[];
}