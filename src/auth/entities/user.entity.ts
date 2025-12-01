import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MeetupEntity } from "../../meetups/entities/meetup.entity";
import { ROLE } from "./user-role.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty({
        description: "User id in db",
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: "User email",
        example: "test@example.com"
    })
    @Column({ unique: true })
    email: string;

    @ApiProperty({
        example: "$2b$10$QOc3vR.....",
        description: "Hashed password",
        writeOnly: true,
    })
    @Column()
    password: string;

    @ApiProperty({
        example: "user",
        description: "User role",
        enum: ROLE,
    })
    @Column({ default: ROLE.USER })
    role: ROLE;

    @OneToMany(() => MeetupEntity, (meetup) => meetup.admin)
    meetups: MeetupEntity[];

    @ApiProperty({
        example: "2025-12-02 00:28:25.486622",
        description: "Creation date"
    })
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}