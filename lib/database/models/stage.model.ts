import { Schema, model, models } from 'mongoose';

export interface IStage extends Document {
  _id: string;
  name: string;
}

const StageSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Stage = models.Stage || model('Stage', StageSchema);

export default Stage;
