import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MeetupEntity } from "./entities/meetup.entity";
import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { UpdateMeetupDto } from "./dto/update-meetup.dto";
import { FindSortMeetupDto } from "./dto/find-sort-meetup.dto";
import { MEETUP_CONSTANT } from "./constants/meetup.constants";

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

    async findAll(query: FindSortMeetupDto): Promise<{ data: MeetupEntity[]; total: number }> {
        const {
            search,
            tags,
            sortBy = MEETUP_CONSTANT.DEFAULT_SORT_FIELD,
            sortOrder = MEETUP_CONSTANT.DEFAULT_SORT_ORDER,
            page = MEETUP_CONSTANT.DEFAULT_PAGE,
            limit = MEETUP_CONSTANT.DEFAULT_LIMIT,
        } = query

        const queryBuilder = this.meetupRepository.createQueryBuilder("meetup");

        if (search) {
            queryBuilder.andWhere(
                "(meetup.title ILIKE :search OR meetup.description ILIKE :search)",
            { search: `%${search}%` }
            );
        }

        if (tags && tags.length > 0) {
            queryBuilder.andWhere(
                "meetup.tags && :tags::text[]",
                { tags }
            );
        }

        const safeSortBy = MEETUP_CONSTANT.SORT_FIELDS.includes(sortBy) ? sortBy : MEETUP_CONSTANT.DEFAULT_SORT_FIELD;
        queryBuilder.orderBy(`meetup.${safeSortBy}`, sortOrder as "ASC" | "DESC");

        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);

        const [data, total] = await queryBuilder.getManyAndCount();
        return { data, total };
    }

    async findOne(id: number): Promise<MeetupEntity> {
        const meetup = await this.meetupRepository.findOne({ where: { id } });
        if(!meetup) {
            throw new NotFoundException(`Meetup not found, id: ${id}`);
        }
        return meetup;
    }

    async update(id: number, updateMeetupDto: UpdateMeetupDto): Promise<MeetupEntity> {
        await this.findOne(id);
        await this.meetupRepository.update(id, updateMeetupDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.meetupRepository.delete(id);
        if (await result.affected === 0) {
            throw new NotFoundException(`Meetup not found, id: ${id}`);
        }
    }
}