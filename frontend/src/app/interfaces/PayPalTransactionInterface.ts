export interface PayPalTransactionInterface{
    TOKEN: string,
    TIMESTAMP: string,
    CORRELATIONID: string,
    ACK: string, //Resultadio de la petición de transacción (success or error)
    VERSION: string,
    BUILD: string,
    paypal_link: string,
}