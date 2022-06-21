import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }

  // user is from app module MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  // creating a user
  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  // reading the user collection
  async readUser() {
    return this.userModel
      .find({})
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }

  // updating the data
  async updateUser(id, data): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  // delete the data
  async deleteUser(id) {
    return this.userModel.findByIdAndRemove(id);
  }
}
