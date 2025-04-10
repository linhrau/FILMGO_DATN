import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingRuntime } from './schemas/booking.entity';
import { BookingModule } from './modules/booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '103.200.23.126',
      port: 3306,
      username: 'truongso_demo',
      password: 'Nson091120@',
      database: 'truongso_demo',
      entities: [BookingRuntime],
      synchronize: true,
    }),
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
