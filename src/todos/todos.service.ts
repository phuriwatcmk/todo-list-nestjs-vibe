import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../users/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async findAll(user: User) {
    return this.todosRepository.find({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, user: User) {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) throw new NotFoundException('ไม่พบ todo นี้');
    if (todo.userId !== user.id) throw new ForbiddenException('ไม่มีสิทธิ์เข้าถึง');
    return todo;
  }

  async create(dto: CreateTodoDto, user: User) {
    const todo = this.todosRepository.create({ ...dto, userId: user.id });
    return this.todosRepository.save(todo);
  }

  async update(id: number, dto: UpdateTodoDto, user: User) {
    const todo = await this.findOne(id, user);
    Object.assign(todo, dto);
    return this.todosRepository.save(todo);
  }

  async remove(id: number, user: User) {
    const todo = await this.findOne(id, user);
    await this.todosRepository.remove(todo);
    return { message: 'ลบ todo สำเร็จ' };
  }
}
