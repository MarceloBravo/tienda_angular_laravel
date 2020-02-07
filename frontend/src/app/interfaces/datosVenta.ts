import { ItemCarrito } from 'src/app/class/item-carrito';
import { UserLoggedInData } from './userLogguedInData';
import { PayPalTransactionInterface } from './PayPalTransactionInterface';

export interface datosVenta{
    numeroDocumento?:number;    //N° Boleta o Factura
    codigoOrden?: string;   //N° de orden de pedido
    tipo_documento: string; //Boleta/Factura
    datosCliente: UserLoggedInData;     //Datos del usuario logueado en la aplicación (Cliente)
    carrito: {[id: number]:ItemCarrito};    //Detalle de productos
    PayPalData?: PayPalTransactionInterface;    //Detalle de la respuesta de la solicitud de transacción devuelta por PayPal
    subtotal: number;  //Total de la venta que considera la sumatoria del precio normal de los producto
    total: number;  //Total de la venta que considera el subtotal, gastos de envìo y descuentos 
    shipping: number;  //Gastos de envío
    descuento: number; //Porcentaje total de descuento
    user_id: number;   //Id del usuario (Cliente)
    estado_id: number; //Código del estado de la orden de compra (Pendiente, En preparación, enviada, finalizada, etc.)           
}