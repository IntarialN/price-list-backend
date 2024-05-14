
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class EUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}