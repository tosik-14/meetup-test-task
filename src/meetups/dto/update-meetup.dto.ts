import {MinLength, MaxLength, IsString, IsDateString, IsArray, ArrayMinSize, IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateMeetupDto {
    @ApiProperty({
        description: "New meetup title",
        example: "Nodejs meetup",
        minLength: 3,
        maxLength: 20,
        required: false,
    })
    @MinLength(3)
    @MaxLength(20)
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({
        description: "New meetup description",
        example: "Meetup for discuss Nodejs",
        maxLength: 100,
        required: false,
    })
    @MaxLength(100)
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: "New meetup tags",
        example: ["newTag", "Nodejs", "javascript"],
        type: [String],
        required: false,
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsString({each: true})
    @IsOptional()
    tags?: string[];

    @ApiProperty({
        description: "New meetup date",
        example: "2025-11-28T21:00:00Z",
        required: false,
    })
    @IsDateString()
    @IsOptional()
    date?: string;

    @ApiProperty({
        description: "New meetup place",
        example: "New place",
        maxLength: 20,
        required: false,
    })
    @MaxLength(20)
    @IsString()
    @IsOptional()
    place?: string;
}