import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';
// metodo di creazione e ritrovamento progetti
@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    this.logger.log(`Creating a new project: ${createProjectDto.nome}`);
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(): Promise<ProjectDocument[]> {
    this.logger.log('Fetching all projects');
    return this.projectModel.find().exec();
  }

   async findOne(id: string): Promise<ProjectDocument> {
    this.logger.log(`Fetching project with ID: ${id}`);
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException(`Progetto con ID ${id} non trovato.`);
    }
    return project;
  }

  async search(name?: string, language?: string): Promise<ProjectDocument[]> {
    this.logger.log(`Searching for projects with: "${name}" and "${language}"`);
    const searchQuery : any = {};
    if (name) {
        searchQuery.name = { $regex: name, $options: 'i'}
    }
    if (language) {
        searchQuery.languages = { $regex: language, $options: 'i'}
    }
    if (Object.keys(searchQuery).length === 0) {
        return [];
    }
    return this.projectModel.find(searchQuery).exec();
  }
}