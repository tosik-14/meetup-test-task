import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { User } from "../../auth/entities/user.entity";

@Entity()
export class MeetupEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column('text', { array: true })
    tags: string[];

    @Column()
    date: Date;

    @Column()
    place: string;

    @ManyToOne(() => User, (user) => user.meetups)
    @JoinColumn({ name: 'admin_id' })
    admin: User;

    @Column({ nullable: true })
    admin_id: number;
}