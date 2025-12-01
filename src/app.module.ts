import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MeetupModule } from "./meetups/meetup.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";


@Module({
  imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: ".env",
      }),

      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
              type: "postgres",
              host: configService.get<string>("DB_HOST"),
              port: configService.get("DB_PORT"),
              username: configService.get<string>("DB_USERNAME"),
              password: configService.get<string>("DB_PASSWORD"),
              database: configService.get<string>('DB_NAME'),
              entities: [__dirname + '\\**\\*.entity{.ts,.js}'],
              synchronize: configService.get<string>("NODE_ENV") === "development",
          }),
          inject: [ConfigService],
      }),
      MeetupModule,
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
