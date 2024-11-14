// src/config/data-source.ts
import { DataSource } from 'typeorm';
import ormConfig from '../../ormconfig';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource(ormConfig);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized');
  })
  .catch((error) => console.log(error));
