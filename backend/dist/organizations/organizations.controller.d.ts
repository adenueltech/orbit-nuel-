import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    create(createOrganizationDto: CreateOrganizationDto): Promise<import("./entities/organization.entity").Organization>;
    findAll(): Promise<import("./entities/organization.entity").Organization[]>;
    findOne(id: string): Promise<import("./entities/organization.entity").Organization | null>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<import("./entities/organization.entity").Organization | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
