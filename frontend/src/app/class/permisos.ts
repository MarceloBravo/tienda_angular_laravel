export class Permisos {
    id?: number;
    rol_id: number;
    pantalla_id: number;
    acceder: boolean;
    crear: boolean;
    actualizar: boolean;
    eliminar: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;

    pantalla?: string;
    rol?: string
}
