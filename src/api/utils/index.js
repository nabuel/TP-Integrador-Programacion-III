/**
 * Importamos el modulo path (nativo de Node.js), la logica para trabajar con archivos y rutas de proyecto. 
 * Esto a partir de Node 22, para ver como se hace en versiones anteriores: https://github.com/profexabi/UTN2026_c2Div131/tree/main/6_tpIntegradorBack/src/api/utils <-- (revisar esta comision)
 */
import { join } from "path";

/**
 * Apuntamos a la carpeta raiz del servidor -> "/".
 * 
 * import.meta.dirname -> devuelve la ruta absoluta del directorio donde esta ubicado el archivo JavaScript actual.
 * 
 * join() es un metodo para unir segmentos de rutas
 */
const __dirname = join(import.meta.dirname, "../../../");


/**
 * Exportamos los elementos declarados para utilizarlos en otros modulos
 */
export {
    __dirname,
    join
}