import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async create(createFileDto: CreateFileDto) {
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

  async findOne(id: number) {
    return this.filesRepository.findOne({
      where: { id },
      relations: ['uploadedBy', 'organization', 'project'],
    });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    await this.filesRepository.update(id, {
      ...updateFileDto,
      lastModified: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.filesRepository.delete(id);
  }

  async findByOrganization(organizationId: number) {
    return this.filesRepository.find({
      where: { organizationId },
      relations: ['uploadedBy', 'organization', 'project'],
    });
  }

  async findByProject(projectId: number) {
    return this.filesRepository.find({
      where: { projectId },
      relations: ['uploadedBy', 'organization', 'project'],
    });
  }
}