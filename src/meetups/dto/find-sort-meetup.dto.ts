import { IsOptional, IsString, IsIn, IsNumber, Min, IsArray } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty, ApiQuery} from "@nestjs/swagger";
import {MEETUP_CONSTANT} from "../constants/meetup.constants";

export class FindSortMeetupDto {
    @ApiProperty({ required: false, description: "Search by title and description" })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiProperty({ required: false, type: [String], description: "Tags for filtration", example: ["Nodejs", "Nestjs"] })
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    tags?: string[];

    @ApiQuery({ required: false, description: "Sort field", enum: MEETUP_CONSTANT.SORT_FIELDS })
    @IsOptional()
    @IsString()
    @IsIn(['title', 'date', 'place'])
    sortBy?: string;

    @ApiQuery({ required: false, description: "Sort order ASC or DESC", enum: ["ASC", "DESC"] })
    @IsOptional()
    @IsString()
    @IsIn(["ASC", "DESC"])
    sortOrder?: "ASC" | "DESC" = "ASC";

    @ApiQuery({ required: false, description: "Page number, should be with Limit", example: MEETUP_CONSTANT.DEFAULT_PAGE })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @ApiQuery({ required: false, description: "Limit of meetups on one page", example: MEETUP_CONSTANT.DEFAULT_LIMIT })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 3;
}