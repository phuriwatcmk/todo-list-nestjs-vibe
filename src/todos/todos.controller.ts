import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Todos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  @ApiOperation({ summary: 'ดึง todos ทั้งหมดของ user' })
  findAll(@Request() req) {
    return this.todosService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึง todo ตาม id' })
  @ApiResponse({ status: 404, description: 'ไม่พบ todo' })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.todosService.findOne(id, req.user);
  }

  @Post()
  @ApiOperation({ summary: 'สร้าง todo ใหม่' })
  create(@Body() dto: CreateTodoDto, @Request() req) {
    return this.todosService.create(dto, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไข todo (ส่งแค่ field ที่ต้องการแก้)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTodoDto, @Request() req) {
    return this.todosService.update(id, dto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบ todo' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.todosService.remove(id, req.user);
  }
}
