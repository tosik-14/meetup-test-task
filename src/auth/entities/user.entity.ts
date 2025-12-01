import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MeetupEntity } from "../../meetups/entities/meetup.entity";
import { ROLE } from "./user-role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: ROLE.USER })
    role: ROLE;

    @OneToMany(() => MeetupEntity, (meetup) => meetup.admin)
    meetups: MeetupEntity[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}