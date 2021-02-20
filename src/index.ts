/**
 * Archivo principal que arranca la aplicación
 *
 * @author llira
 * @version 1.0
 */
import { App } from './app';

async function main() {
  try {
    const app = new App();
    await app.listen();
  } catch (e) {
    console.error(e);
  }
}

main();
