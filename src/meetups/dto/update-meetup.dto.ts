import {IsString, IsDateString, IsArray, IsNotEmpty, IsOptional} from "class-validator";

export class UpdateMeetupDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsString({each: true})
    @IsOptional()
    tags?: string[];

    @IsDateString()
    @IsOptional()
    date?: string;

    @IsString()
    @IsOptional()
    place?: string;
}