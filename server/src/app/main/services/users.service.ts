import { MongoClient } from 'mongodb';
import { User } from '../../shared/types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default class UsersService {
private mongoClient: MongoClient;
private users: User[];

  constructor() {
    this.mongoClient = new MongoClient('mongodb+srv://rs-clone');
    this.users = [];
    this.users.push({ login: 'exi', password: '$2a$10$ZVeTin07G8KvTVsMRS0JCOiIaFhPlL4EMkuqHqX5b30THx8WYoKBi'}); //3256
    this.users.push({ login: 'guest', password: '$2a$10$PhbuteuClinD4c6HI.ZIlerUb5ap/cicvGQFoBGbJYbAsVs19npw6' }); //111
    this.users.push({ login: 'admin', password: '$2a$10$HbL13/39z5vqWGGr1My3.OHuXLhE1n4VfYxHYIA1i6e6WuPZAVDHm' }); //p@ssw0rd
  }

  public findByLogin(login: string) {
    return this.users.find((user) => user.login === login);
  }

  public create(user: User) {
    console.log('created user', user);
    this.users.push(user);
    return user;
  }

  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt);
  }

  public createToken(login: string) {
    return jwt.sign({ login: login }, process.env.TOKEN_SECRET||'secret');
  }

  public verifyToken(auth: string) {
    const token:string = auth.split(' ')[0] === 'Bearer' ? auth.split(' ')[1]: '';
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET!||'secret');
      console.log('verified', verified);
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  }
}