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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("./entities/file.entity");
let FilesService = class FilesService {
    filesRepository;
    constructor(filesRepository) {
        this.filesRepository = filesRepository;
    }
    async create(createFileDto) {
        const file = this.filesRepository.create({
            ...createFileDto,
            uploadedAt: new Date(),
            lastModified: new Date(),
        });
        return this.filesRepository.save(file);
    }
    async findAll() {
        return this.filesRepository.find({
            relations: ['uploadedBy', 'organization', 'project'],
        });
    }
    async findOne(id) {
        return this.filesRepository.findOne({
            where: { id },
            relations: ['uploadedBy', 'organization', 'project'],
        });
    }
    async update(id, updateFileDto) {
        await this.filesRepository.update(id, {
            ...updateFileDto,
            lastModified: new Date(),
        });
        return this.findOne(id);
    }
    async remove(id) {
        return this.filesRepository.delete(id);
    }
    async findByOrganization(organizationId) {
        return this.filesRepository.find({
            where: { organizationId },
            relations: ['uploadedBy', 'organization', 'project'],
        });
    }
    async findByProject(projectId) {
        return this.filesRepository.find({
            where: { projectId },
            relations: ['uploadedBy', 'organization', 'project'],
        });
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FilesService);
//# sourceMappingURL=files.service.js.map