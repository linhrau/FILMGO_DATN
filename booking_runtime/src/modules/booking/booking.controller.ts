import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  getAllBooking() {
    return this.bookingService.getAllBooking();
  }

  @Post()
  createBooking(@Body() data: { id: number }) {
    if (!data.id) {
      throw new BadRequestException();
    }

    return this.bookingService.createBooking(data.id);
  }

  @Delete(':id')
  deleteBooking(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException();
    }

    return this.bookingService.deleteBooking(id);
  }
}
