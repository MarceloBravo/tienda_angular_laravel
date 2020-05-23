export class ImagenProducto {
    id: number;
    producto_id: number;
    nombre_archivo: string;
    default: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;

    blob?: Blob;
    key?: number;
}
