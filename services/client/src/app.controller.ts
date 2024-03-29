import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { createClientSchema } from './dto/validators/create-client.validator';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationDto } from './dto/pagination.dto';
import { paginationValidator } from './dto/validators/pagination.validator';
import { ClientListResponse } from './types/client-list-response.type';
import { ClientResponse } from './types/client-default-response.type';
import { searchClientValidator } from './dto/validators/search-client.validator';
import { SearchClientDto } from './dto/search-client.dto';

@Controller('/service/client')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  @UsePipes(new ZodValidationPipe(createClientSchema))
  async createClient(
    @Body() clientData: CreateClientDto,
  ): Promise<ClientResponse> {
    return this.appService.create(clientData);
  }

  @Get('read/:id')
  async getClientById(@Param('id') id: string): Promise<ClientResponse> {
    return this.appService.getClientById(id);
  }

  @Patch('update/:id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientData: UpdateClientDto,
  ): Promise<ClientResponse> {
    return this.appService.updateClient(id, updateClientData);
  }

  @Delete('delete/:id')
  async deleteClient(@Param('id') id: string): Promise<ClientResponse> {
    return this.appService.deleteClient(id);
  }

  @Get('search')
  @UsePipes(new ZodValidationPipe(searchClientValidator))
  async searchClients(
    @Query() query: SearchClientDto,
  ): Promise<ClientResponse> {
    return this.appService.searchClients(query);
  }

  @Get('list')
  @UsePipes(new ZodValidationPipe(paginationValidator))
  async listClients(
    @Query() paginationDto: PaginationDto,
  ): Promise<ClientListResponse> {
    const { page, limit } = paginationDto;
    return this.appService.listClients(page, limit);
  }
}
