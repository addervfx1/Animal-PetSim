import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // O host será localhost pois o PostgreSQL está rodando no Docker
      port: 5432,        // Porta 5432
      username: 'admin',  // Definido no docker-compose
      password: 'admin167',  // Definido no docker-compose
      database: 'animalsim',  // Definido no docker-compose
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,  // Sincroniza o banco de dados (apenas para desenvolvimento)
    }),
  ],
})
export class AppModule {}
