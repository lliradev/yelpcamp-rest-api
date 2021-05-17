import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  id: string;
  fullname: string;
  email: string;
  password: string;
  saltSecret?: string;
  avatar?: string;
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;
}

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: 'El nombre completo no puede estar vacío',
  },
  email: {
    type: String,
    required: 'El correo electrónico no puede estar vacío',
    unique: true,
  },
  password: {
    type: String,
    required: 'La contraseña no puede estar vacía',
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
  },
  saltSecret: String,
  avatar: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

export default model<User>('User', UserSchema);
