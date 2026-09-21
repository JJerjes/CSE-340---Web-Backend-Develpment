// IMPORTA LA CONEXION A LA BASE DE DATOS DESDE EL ARCHIVO db.js
import db from './db.js';

// DEFINE UNA FUNCION ASINCRONA QUE CONSULTA LA BASE DE DATOS DE TODAS LAS ORGANIZACIONES
const getAllOrganizations = async () => {

  // GUARDA EN UNA VARIABLE LA ORDEN EN LENGUAJE SQL PARA PEDIR LOS DATOS
  const query = `
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM public.organization;
  `;

  // LE ENVIA LA ORDEN A POSTGRESQL Y ESPERA (AWAIT) A QUE LLEGUEN LOS RESULTADOS
  const result = await db.query(query);

  // DEVUELVE LAS FILAS DEL RESULTADO SI TIENE EXITO
  return result.rows;
};

// RECUPERA LOS DETALLES DE UNA ORGANIZACIÓN ESPECÍFICA MEDIANTE SU ID (USANDO CONSULTA PARAMETRIZADA $1)
const getOrganizationDetails = async (organizationId) => {
  const query = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM organization
    WHERE organization_id = $1;
  `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  // DEVUELVE LA PRIMERA FILA SI EXISTE, O NULL SI NO SE ENCUENTRA LA ORGANIZACIÓN
  return result.rows.length > 0 ? result.rows[0] : null;
};

// EXPORTA LAS FUNCIONES DEL MODELO PARA PODER USARLAS EN OTRAS PARTES DE LA APLICACION (EJ. CONTROLADORES)
export { getAllOrganizations, getOrganizationDetails };