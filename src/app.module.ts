import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module'; // Import the UsersModule from the correct file
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
