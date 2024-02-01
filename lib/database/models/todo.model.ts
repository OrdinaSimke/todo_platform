import { Schema, model, models } from 'mongoose';

export interface ITodo extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl?: string;
  startDateTime: Date;
  estimatedHours: string;
  isPrivate: boolean;
  url?: string;
  project?: { _id: string; name: string };
  user?: { _id: string; firstName: string; lastName: string };
}

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
  startDateTime: { type: Date, default: Date.now },
  estimatedHours: { type: String },
  isPrivate: { type: Boolean, default: false },
  url: { type: String },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Todo = models.Todo || model('Todo', TodoSchema);

export default Todo;
