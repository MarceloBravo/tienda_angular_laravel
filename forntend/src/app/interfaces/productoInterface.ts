export interface ProductoInterface{
    id: number;
    nombre: string;
    descripcion: string;
    resumen: string;
    slug: string;
    categoria_id: number;
    marca_id: number;
    precio: number;
    precio_anterior: number;
    visible: boolean;
    color: string;
    nuevo: boolean;
    oferta: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    imagenes?: [];
    porcentaje_descuento?: number;
}