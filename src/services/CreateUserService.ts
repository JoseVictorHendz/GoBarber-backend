import { getRepository } from 'typeorm';

import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkExistis = await userRepository.findOne({
      where: { email },
    });

    if (checkExistis) {
      throw new Error('Email addres already used.');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
