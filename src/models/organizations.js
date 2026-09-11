//IMPORTA LA CONEXION A LA BASE DE DATOS DESDE EL ARCHIVO db.js
import db from './db.js';

// DEFINE UNA FUNCION ASINCRONA QUE CONSULTA LA BASE DE DATOS DE TODAS LAS ORGANIZACIONES
const getAllOrganizations = async () => {

  //GUARDA EN UNA VARIABLE LA ORDEN EN LEGUAJE SQL PARA PEDIR LOS DATOS
  const query = `
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM public.organization;
  `;

  // LE ENVIA LA ORDEN A POSTGRESQL Y ESPERA (AWAIT) A QUE LLEGUEN LOS RESULTADOS
  const result = await db.query(query);

  // DEVUELVE LAS FILAS DEL RESULTADO SI TIENE EXITO
  return result.rows;
};

//EXPORTA LA FUNCION "getAllOrganizations" PARA PODER USARLA EN OTRAS PARTES DE LA APLICACION
export { getAllOrganizations };

