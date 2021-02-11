import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtModule.register({ privateKey: '123123' })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
