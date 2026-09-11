//IMPORTA LA LIBRERIA POOL DEL PAQUETE PG
import { Pool } from 'pg';

//CREA LA CONFIGURACION DEL POOL
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: true
});

//DECLARA LA VARIABLE DE EXPORTACION
let db = null;

//CONFIGURA EL MODO DEPURACION (LOGGING)
if (process.env.NODE_ENV === 'development' && process.env.ENABLE_SQL_LOGGING === 'true') {
  //Revisa si estas en tu PC y si activaste los registros
  //si es "true" imprime en consola las filas afectadas.

  db = {
    async query(text, params) {
      try {
        
        const start = Date.now();
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Excuted query:', {
          text: text.replace(/\s+/g, ' ').trim(),
          duration: `${duration}ms`,
          rows: res.rowCount
        });
        return res;
      } catch (error) {
        console.error('Error in query:', {
          text: text.replace(/\s+/g, ' ').trim(),
          error: error.message
        });
        throw error;
      }
    },
    
    async close() {
      await pool.end();
    }
  };
} else {
  //si es "false" asigna al db= pool directamente para ejecutar todo en silencio y a maxima velocidad
  db = pool;
}

// CREAR LA FUNCION DE PRUEBA
const testConnection = async () => {
  try {
    const result = await db.query('SELECT NOW() as current_time');
    console.log('Database connection successful:', result.rows[0].current_time);
    return true;
  } catch (error) {
    console.error('Databse connection failed:', error.message);
    throw error;
  }
};

//EXPORTAR LOS MODULOS
export { db as default, testConnection };