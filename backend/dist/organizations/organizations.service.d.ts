import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationsService {
    private organizationsRepository;
    constructor(organizationsRepository: Repository<Organization>);
    create(createOrganizationDto: CreateOrganizationDto): Promise<Organization>;
    findAll(): Promise<Organization[]>;
    findOne(id: number): Promise<Organization | null>;
    update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
