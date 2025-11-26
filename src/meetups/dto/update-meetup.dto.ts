import {MinLength, MaxLength, IsString, IsDateString, IsArray, ArrayMinSize, IsNotEmpty, IsOptional} from "class-validator";

export class UpdateMeetupDto {
    @MinLength(3)
    @MaxLength(20)
    @IsString()
    @IsOptional()
    title?: string;

    @MaxLength(100)
    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsString({each: true})
    @IsOptional()
    tags?: string[];

    @IsDateString()
    @IsOptional()
    date?: string;

    @MaxLength(20)
    @IsString()
    @IsOptional()
    place?: string;
}