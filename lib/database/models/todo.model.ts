import { Schema, model, models } from 'mongoose';

export interface ITodo extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  deadline?: Date;
  estimatedHours: string;
  isPrivate: boolean;
  isCompleted: boolean;
  url?: string;
  project?: { _id: string; name: string };
  organizer?: { _id: string; firstName: string; lastName: string };
  stageId?: string;
  assigneeId?: string;
}

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
  startDateTime: { type: Date, default: null },
  endDateTime: { type: Date, default: null },
  deadline: { type: Date, default: null },
  estimatedHours: { type: String },
  isPrivate: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  url: { type: String },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  stageId: { type: String },
  assigneeId: { type: String },
});

const Todo = models.Todo || model('Todo', TodoSchema);

export default Todo;
