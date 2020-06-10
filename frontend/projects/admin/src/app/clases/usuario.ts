export class Usuario {
    id?: number;
    rut: string;
    nombre: string;
    a_paterno: string;
    a_materno: string;
    email: string;
    email_verified_at?: Date;
    nickname: string;
    password?: string;
    direccion: string;
    fono: string;
    rol_id: number;
    ciudad_id: number;
    remember_token?: string;
    token: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;

    rol: string;
    ciudad: string;

    pais_id?: number;
    region_id?: number;
    provincia_id?: number;
    comuna_id?: number;
}
