import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MeetupModule } from "./meetups/meetup.module";


@Module({
  imports: [
      MeetupModule,
      TypeOrmModule.forRoot({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "123",
        database: "meetup_db",
        entities: [__dirname + '\\**\\*.entity{.ts,.js}'],
        synchronize: true,
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
