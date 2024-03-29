import { Schema, model, models } from 'mongoose';

export interface ITodo extends Document {
  _id: string;
  title: string;
  project?: string;
  description?: string;
  createdAt: Date;
  imageUrl?: string;
  startDateTime: Date;
  endDateTime: Date;
  isPrivate: boolean;
  url?: string;
  category?: { _id: string; name: string };
  user?: { _id: string; firstName: string; lastName: string };
}

const TodoSchema = new Schema({
  title: { type: String, required: true },
  project: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  isPrivate: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Todo = models.Todo || model('Todo', TodoSchema);

export default Todo;
