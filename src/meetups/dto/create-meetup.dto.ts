import { MinLength, MaxLength, IsString, IsDateString, IsArray, ArrayMinSize, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMeetupDto {
    @ApiProperty({
        description: "Meetup title",
        example: "Nestjs meetup",
        minLength: 3,
        maxLength: 20
    })
    @MinLength(3)
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: "Meetup description",
        example: "Meetup for discuss Nestjs",
        maxLength: 100
    })
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: "Meetup tags",
        example: ["Nestjs", "Nodejs", "typescript"],
        type: [String]
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsString({each: true})
    tags: string[];

    @ApiProperty({
        description: "Meetup date",
        example: "2025-11-28T19:00:00Z"
    })
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({
        description: "Meetup place",
        example: "Minsk",
        maxLength: 20
    })
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    place: string;
}