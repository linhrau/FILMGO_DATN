import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookingRuntime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seat_id: number;

  @Column()
  expire: string;
}
