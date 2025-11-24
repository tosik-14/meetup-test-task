import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MeetupEntity } from "./entities/meetup.entity";
import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { UpdateMeetupDto } from "./dto/update-meetup.dto";

@Injectable()
export class MeetupService {
    constructor(
        @InjectRepository(MeetupEntity)
        private meetupRepository: Repository<MeetupEntity>,
    ) {}

    async create(createMeetupDto: CreateMeetupDto): Promise<MeetupEntity>{
        const meetup = this.meetupRepository.create(createMeetupDto);
        return await this.meetupRepository.save(meetup);
    }

    async findAll(): Promise<MeetupEntity[]> {
        return this.meetupRepository.find();
    }

    async findOne(id: number): Promise<MeetupEntity> {
        const meetup = this.meetupRepository.findOne({ where: { id } });
        if(!meetup) {
            throw new NotFoundException(`Meetup not found, id: ${id}`);
        }
        return meetup;
    }

    async update(id: number, updateMeetupDto: UpdateMeetupDto): Promise<MeetupEntity> {
        const meetup = this.findOne(id);
        const updatedMeetup = Object.assign(meetup, updateMeetupDto);
        return this.meetupRepository.save(updatedMeetup);
    }

    async remove(id: number): Promise<void> {
        const result = await this.meetupRepository.delete(id);
        if (await result.affected === 0) {
            throw new NotFoundException(`Meetup not found, id: ${id}`);
        }
    }
}