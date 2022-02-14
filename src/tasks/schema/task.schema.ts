import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type TaskDocument = Task & mongoose.Document;

@Schema({
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.user;
    },
    versionKey: false,
  },
})
export class Task {
  @Prop({ required: true })
  task_name: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  deadline: mongoose.Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true })
  user: User;
}

const TaskSchema = SchemaFactory.createForClass(Task);

export { TaskSchema };
