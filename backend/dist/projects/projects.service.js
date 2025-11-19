"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Not_1 = require("typeorm/find-options/operator/Not");
const project_entity_1 = require("./entities/project.entity");
let ProjectsService = class ProjectsService {
    projectsRepository;
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }
    async create(createProjectDto) {
        const project = this.projectsRepository.create({
            ...createProjectDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return this.projectsRepository.save(project);
    }
    async findAll(organizationId) {
        const where = organizationId ? { organizationId } : {};
        return this.projectsRepository.find({
            where,
            relations: ['owner', 'organization', 'tasks'],
        });
    }
    async findOne(id) {
        return this.projectsRepository.findOne({
            where: { id },
            relations: ['owner', 'organization', 'tasks'],
        });
    }
    async update(id, updateProjectDto) {
        await this.projectsRepository.update(id, {
            ...updateProjectDto,
            updatedAt: new Date(),
        });
        return this.findOne(id);
    }
    async remove(id) {
        return this.projectsRepository.delete(id);
    }
    async countActive(organizationId) {
        return this.projectsRepository.count({
            where: {
                organizationId,
                status: (0, Not_1.Not)('completed'),
            },
        });
    }
    async findRecent(organizationId, limit = 4) {
        return this.projectsRepository.find({
            where: { organizationId },
            order: { createdAt: 'DESC' },
            take: limit,
            relations: ['owner'],
        });
    }
    async getStatusDistribution(organizationId) {
        const result = await this.projectsRepository
            .createQueryBuilder('project')
            .select('project.status', 'status')
            .addSelect('COUNT(*)', 'count')
            .where('project.organizationId = :organizationId', { organizationId })
            .groupBy('project.status')
            .getRawMany();
        const total = result.reduce((sum, item) => sum + parseInt(item.count), 0);
        return result.map((item) => ({
            name: item.status || 'Unknown',
            value: Math.round((parseInt(item.count) / total) * 100),
            color: this.getStatusColor(item.status),
        }));
    }
    getStatusColor(status) {
        const colors = {
            active: '#10b981',
            planning: '#f59e0b',
            completed: '#6b7280',
            'on-hold': '#ef4444',
        };
        return colors[status] || '#6b7280';
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map