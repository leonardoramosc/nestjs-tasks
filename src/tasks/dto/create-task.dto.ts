import {
  IsNotEmpty,
  IsString,
  IsDateString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  task_name: string;

  @IsOptional()
  @IsDateString()
  deadline: string;
}
