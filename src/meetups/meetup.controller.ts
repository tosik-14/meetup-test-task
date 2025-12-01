import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    ParseIntPipe, Query, ValidationPipe, UseGuards,
} from "@nestjs/common";
import { MeetupService } from "./meetup.service";
import { MeetupEntity } from "./entities/meetup.entity";
import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { UpdateMeetupDto } from "./dto/update-meetup.dto";
import { FindSortMeetupDto } from "./dto/find-sort-meetup.dto";
import {ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth} from "@nestjs/swagger";
import { MEETUP_CONSTANT } from "./constants/meetup.constants";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { RolesDecorator } from "../auth/decorators/roles.decorator";
import { ROLE } from "../auth/entities/user-role.enum";


@ApiTags("meetups")
@Controller("meetups")
export class MeetupController {
    constructor(
        private readonly meetupService: MeetupService
    ) {}

    @Get()
    @ApiOperation({ summary: "Get meetup list" })
    @ApiQuery({ name: "search", required: false, description: "Search by title and description" })
    @ApiQuery({ name: "tags", required: false, type: String, description: "Filter by tags" })
    @ApiQuery({ name: "page", required: false, example: MEETUP_CONSTANT.DEFAULT_PAGE })
    @ApiQuery({ name: "limit", required: false, example: MEETUP_CONSTANT.DEFAULT_LIMIT })
    @ApiQuery({ name: "sortBy", required: false, enum: MEETUP_CONSTANT.SORT_FIELDS })
    @ApiQuery({ name: "sortOrder", required: false, enum: ["ASC", "DESC"] })
    @ApiResponse({ status: 200, description: "Successful response" })
    async findAll(@Query(new ValidationPipe({ transform: true })) query: FindSortMeetupDto): Promise<{
        data: MeetupEntity[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        const result = await this.meetupService.findAll(query);

        return {
            data: result.data,
            total: result.total,
            page: query.page || 1,
            limit: query.limit || 3,
            totalPages: Math.ceil(result.total / (query.limit || 3)),
        };
    }

    @Get(":id")
    @ApiOperation({ summary: "Get meetup by id" })
    @ApiResponse({ status: 200, description: "Meetup found" })
    @ApiResponse({ status: 404, description: "Meetup not found" })
    async findOne(@Param("id", ParseIntPipe) id: number): Promise<MeetupEntity> {
        return this.meetupService.findOne(id);
    }

    @Post()
    @ApiBearerAuth("JWT-auth")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RolesDecorator(ROLE.ADMIN)
    @ApiOperation({ summary: "Create new meetup, for admin only" })
    @ApiResponse({ status: 201, description: "Meetup created" })
    @ApiResponse({ status: 400, description: "Invalid data" })
    @ApiResponse({ status: 401, description: "Not authorized" })
    @ApiResponse({ status: 403, description: "You have no permission" })
    async create(@Body() createMeetupDto: CreateMeetupDto): Promise<MeetupEntity> {
        return this.meetupService.create(createMeetupDto);
    }

    @Patch(":id")
    @ApiBearerAuth("JWT-auth")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RolesDecorator(ROLE.ADMIN)
    @ApiOperation({ summary: "Update meetup data, for admin only" })
    @ApiResponse({ status: 200, description: "Meetup updated" })
    @ApiResponse({ status: 401, description: "Not authorized" })
    @ApiResponse({ status: 403, description: "You have no permission" })
    @ApiResponse({ status: 404, description: "Meetup not found" })
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateMeetupDto: UpdateMeetupDto,
    ): Promise<MeetupEntity> {
        return this.meetupService.update(id, updateMeetupDto);
    }

    @Delete(":id")
    @ApiBearerAuth("JWT-auth")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RolesDecorator(ROLE.ADMIN)
    @ApiOperation({ summary: "Delete meetup, for admin only" })
    @ApiResponse({ status: 200, description: "Meetup deleted" })
    @ApiResponse({ status: 401, description: "Not authorized" })
    @ApiResponse({ status: 403, description: "You have no permission" })
    @ApiResponse({ status: 404, description: "Meetup not found" })
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<void> {
        return this.meetupService.remove(id);
    }
}