import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Column()
    plan_id: string;

    @Column()
    start_date: Date;

    @Column()
    valid_till: Date;

    @Column()
    created_at: Date;
}