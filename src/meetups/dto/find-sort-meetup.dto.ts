import { IsOptional, IsString, IsIn, IsNumber, Min, IsArray } from "class-validator";
import { Type, Transform } from "class-transformer";

export class FindSortMeetupDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Transform(({ value }) => {
        if (value === undefined || value === null) return undefined;

        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === 'string') {
            return [value];
        }
        return undefined;
    })
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