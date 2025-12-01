import { IsOptional, IsString, IsIn, IsNumber, Min, IsArray } from "class-validator";
import { Type } from "class-transformer";

export class FindSortMeetupDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    tags?: string[];

    @IsOptional()
    @IsString()
    @IsIn(['title', 'date', 'place'])
    sortBy?: string;

    @IsOptional()
    @IsString()
    @IsIn(["ASC", "DESC"])
    sortOrder?: "ASC" | "DESC" = "ASC";

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 3;
}