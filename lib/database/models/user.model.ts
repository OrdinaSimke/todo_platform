import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true },
  username: { type: String, required: false, unique: true },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  photo: { type: String, required: false },
});

const User = models.User || model('User', UserSchema);

export default User;
