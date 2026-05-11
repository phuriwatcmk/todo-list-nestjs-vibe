import { IsString, IsOptional, IsEnum, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TodoStatus } from '../todo.entity';

export class CreateTodoDto {
  @ApiProperty({ example: 'ทำการบ้าน' })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiPropertyOptional({ example: 'ทำแบบฝึกหัดบทที่ 3' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: TodoStatus, default: TodoStatus.PENDING })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
