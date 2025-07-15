import { Controller, Get, Post, Body, UseGuards, Logger, Param, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles, Role } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects - Gestione Progetti')
@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(Role.Admin) // solo gli Admin possono creare progetti
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  create(@Body() createProjectDto: CreateProjectDto) {
    this.logger.log(`Received request to create project: ${createProjectDto.nome}`);
    return this.projectsService.create(createProjectDto);
  }

  @Get() // pubblico
  findAll() {
    this.logger.log('Received request to find all projects');
    return this.projectsService.findAll();
  }

  @Get('search') // cerca per nome e/o linguaggio
  @ApiOperation({ summary: 'Cerca progetti per nome o disciplina' })
  searchProjects(
    @Query('nome') nome: string,
    @Query('linguaggio') linguaggio: string) {
    this.logger.log(`Received search request with query: "${nome}" and ${linguaggio}`);
    return this.projectsService.search(nome, linguaggio);
  }

  // DOPO '/search', altrimenti 'search' verrebbe interpretato come un ID
  @Get(':id')
  @ApiOperation({ summary: 'Recupera i dettagli tecnici di un singolo progetto' })
  findOne(@Param('id') id: string) {
    this.logger.log(`Received request for project with ID: ${id}`);
    return this.projectsService.findOne(id);
  }
}