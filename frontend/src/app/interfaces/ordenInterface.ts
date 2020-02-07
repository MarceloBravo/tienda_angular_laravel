export interface ordenesInterface{
    id?: number;
    subTotal: number;
    descuento: number;
    user_id: number;
    estado_id: number;
    tipo_documento: string;
    num_boleta?: number;
    num_factura?: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}