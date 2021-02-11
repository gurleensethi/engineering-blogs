import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncModule } from './sync/sync.module';
import { PublicationModule } from './publication/publication.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ScheduleModule.forRoot(),
    DatabaseModule,
    PostModule,
    SyncModule,
    PublicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
