export class Pantalla {
    id: number;
    nombre: string;
    tabla: string;
    permite_crear: boolean;
    permite_editar: boolean;
    permite_eliminar: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}
