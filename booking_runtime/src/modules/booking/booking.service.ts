import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingRuntime } from 'src/schemas/booking.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingRuntime)
    private bookingRepository: Repository<BookingRuntime>,
  ) {}

  async createBooking(id: number) {
    try {
      const data = this.bookingRepository.create({
        seat_id: id,
        expire: (new Date().getTime() + 900000).toString(),
      });
      const booking = await this.bookingRepository.save(data);
      return {
        code: HttpStatus.OK,
        data: booking,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async getAllBooking() {
    try {
      const data = await this.bookingRepository.find({
        where: {
          expire: MoreThan(new Date().getTime().toString()),
        },
      });
      return {
        code: HttpStatus.OK,
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async deleteBooking(id: number) {
    try {
      const data = await this.bookingRepository.delete({
        seat_id: id,
      });
      return {
        code: HttpStatus.OK,
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
