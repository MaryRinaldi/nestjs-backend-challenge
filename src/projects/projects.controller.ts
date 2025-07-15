import { Controller, Get, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles, Role } from 'src/auth/decorators/roles.decorator';

@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(Role.Admin) // solo gli Admin possono creare progetti
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createProjectDto: CreateProjectDto) {
    this.logger.log(`Received request to create project: ${createProjectDto.nome}`);
    return this.projectsService.create(createProjectDto);
  }

  @Get() // pubblico
  findAll() {
    this.logger.log('Received request to find all projects');
    return this.projectsService.findAll();
  }
}