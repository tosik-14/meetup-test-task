import { IsString, IsDateString, IsArray, IsNotEmpty } from "class-validator";

export class CreateMeetupDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @IsString({each: true})
    tags: string[];

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    place: string;
}