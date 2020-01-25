export interface usuariosInterfaces{
    id?: number,
    nombre: string,
    a_paterno: string,
    a_materno: string,
    email: string,
    nickname: string,
    password: string,
    confirm_password: string,
    direccion: string,
    fono: string,
    rol_id: number,
    ciudad_id: number,
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date
}