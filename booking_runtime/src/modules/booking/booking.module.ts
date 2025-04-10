import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingRuntime } from 'src/schemas/booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookingRuntime])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
