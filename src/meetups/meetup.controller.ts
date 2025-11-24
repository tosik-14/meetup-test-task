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
    ParseIntPipe,
} from "@nestjs/common";
import { MeetupService } from "./meetup.service";
import { MeetupEntity } from "./entities/meetup.entity";
import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { UpdateMeetupDto } from "./dto/update-meetup.dto";

@Controller('meetups')
export class MeetupController {
    constructor(
        private readonly meetupService: MeetupService
    ) {}

    @Get()
    async findAll(): Promise<MeetupEntity[]> {
        return this.meetupService.findAll();
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