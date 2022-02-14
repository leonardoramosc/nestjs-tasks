import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schema/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(createTaskDto: CreateTaskDto, userId: string): Promise<TaskDocument> {
    const createdUser = new this.taskModel({ ...createTaskDto, user: userId });
    return createdUser.save();
  }

  findAll(filter: {} = {}) {
    return this.taskModel.find(filter).exec();
  }

  findOne(id: string, filter: {} = {}) {
    return this.taskModel.findOne({ ...filter, id });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
