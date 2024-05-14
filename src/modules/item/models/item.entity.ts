import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('items')
export class EItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2, default: 100 })
    price: number;
}