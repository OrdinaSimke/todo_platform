import { Schema, model, models } from 'mongoose';

export interface IProject extends Document {
  _id: string;
  name: string;
}

const ProjectSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
