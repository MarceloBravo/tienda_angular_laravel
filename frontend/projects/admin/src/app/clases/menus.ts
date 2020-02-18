import { Pantalla } from './pantalla';
export class Menus {
    id?: number;
    nombre: string;
    icono_fa_class: string;
    menu_padre_id: number;    
    posicion: number;
    pantalla_id: number;    
    url: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    pantalla?: Pantalla;

    menu_padre?: string;
    nombre_pantalla?: string;
    nombre_tabla?: string; 
}
