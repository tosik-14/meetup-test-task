import { MinLength, MaxLength, IsString, IsDateString, IsArray, ArrayMinSize, IsNotEmpty } from "class-validator";

export class CreateMeetupDto {
    @MinLength(3)
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    title: string;

    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsString({each: true})
    tags: string[];

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    place: string;
}