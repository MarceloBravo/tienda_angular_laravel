import { ImagenProducto } from './imagen-producto';

export class Producto {
    id?: number;
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
    porcentaje_descuento: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: File;

    file?: string;
    ruta_imagen?: string;
    imagenes?: ImagenProducto[];
}
