import { AppDataSource } from './data-source';
import app from './app';

AppDataSource.initialize()
  .then(async () => {
    console.log('Database has been conneted!');
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((erro) => console.error(erro));
