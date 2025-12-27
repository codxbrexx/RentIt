import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { ListingsModule } from './modules/listings';
import { BookingsModule } from './modules/bookings';
import { ReviewsModule } from './modules/reviews';
import { MessagesModule } from './modules/messages';
import { AdminModule } from './modules/admin';
import { FavoritesModule } from './modules/favorites';
import { NotificationsModule } from './modules/notifications';
import {
  User,
  UserProfile,
  Listing,
  ListingImage,
  Booking,
  Review,
  Conversation,
  Message,
  Favorite,
  Notification,
} from './database/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';

        if (isProduction) {
          return {
            type: 'postgres',
            host: configService.get<string>('database.host') || process.env.DATABASE_HOST,
            port: configService.get<number>('database.port') || 5432,
            username: configService.get<string>('database.username') || process.env.DATABASE_USERNAME,
            password: configService.get<string>('database.password') || process.env.DATABASE_PASSWORD,
            database: configService.get<string>('database.name') || process.env.DATABASE_NAME,
            entities: [
              User,
              UserProfile,
              Listing,
              ListingImage,
              Booking,
              Review,
              Conversation,
              Message,
              Favorite,
              Notification,
            ],
            synchronize: true, // Should be false in real prod, but true for this demo transition
            logging: false,
          };
        }

        return {
          type: 'better-sqlite3',
          database: 'renit-dev.db',
          entities: [
            User,
            UserProfile,
            Listing,
            ListingImage,
            Booking,
            Review,
            Conversation,
            Message,
            Favorite,
            Notification,
          ],
          synchronize: true,
          logging: true,
        };
      },
    }),
    AuthModule,
    UsersModule,
    ListingsModule,
    BookingsModule,
    ReviewsModule,
    MessagesModule,
    AdminModule,
    FavoritesModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
