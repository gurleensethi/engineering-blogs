import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncModule } from './sync/sync.module';
import { PublicationModule } from './publication/publication.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    PostModule,
    SyncModule,
    PublicationModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
