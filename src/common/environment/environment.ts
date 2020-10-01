/**
 * Variables de entorno que serán utilizadas en toda la aplicación
 *
 * @author llira
 * @version 1.0
 */
import { config } from 'dotenv';

// Condición para llamar el método config() si el ambiente es desarrollo
if (process.env.NODE_ENV !== 'production') {
  config();
}

export const environment = {
  databaseUrl: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXP,
};
