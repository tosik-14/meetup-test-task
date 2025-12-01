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
    ParseIntPipe, Query,
} from "@nestjs/common";
import { MeetupService } from "./meetup.service";
import { MeetupEntity } from "./entities/meetup.entity";
import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { UpdateMeetupDto } from "./dto/update-meetup.dto";
import {FindSortMeetupDto} from "./dto/find-sort-meetup.dto";

@Controller('meetups')
export class MeetupController {
    constructor(
        private readonly meetupService: MeetupService
    ) {}

    @Get()
    async findAll(@Query() query: FindSortMeetupDto): Promise<{
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
    async findOne(@Param("id", ParseIntPipe) id: number): Promise<MeetupEntity> {
        return this.meetupService.findOne(id);
    }

    @Post()
    async create(@Body() createMeetupDto: CreateMeetupDto): Promise<MeetupEntity> {
        return this.meetupService.create(createMeetupDto);
    }

    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateMeetupDto: UpdateMeetupDto,
    ): Promise<MeetupEntity> {
        return this.meetupService.update(id, updateMeetupDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<void> {
        return this.meetupService.remove(id);
    }
}