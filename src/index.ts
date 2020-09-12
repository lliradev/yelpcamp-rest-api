import app from './app';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
  console.log('Enviroment:', process.env.NODE_ENV);
});
