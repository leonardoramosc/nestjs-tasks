import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schema/user.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const isPasswordCorrect = await bcrypt.compare(pass, user?.password);

    if (isPasswordCorrect) {
      return user;
    };

    return null;
  }

  async login(user: UserDocument) {
    const payload = { sub: user.id, ...user.toJSON() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return {
      user,
      access_token: this.jwtService.sign(user)
    }
  }
}
