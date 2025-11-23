import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MeetupEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column('simple-array')
    tags: string[];

    @Column()
    date: Date;

    @Column()
    place: string;
}