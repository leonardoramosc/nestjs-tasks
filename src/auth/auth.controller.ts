import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { SkipAuth } from 'src/decorators/skip-auth.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @SkipAuth()
  @HttpCode(200)
  @Post('signin')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @SkipAuth()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.signup(createUserDto);
  }
}
