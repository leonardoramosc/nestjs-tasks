import { IsAlpha, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @IsAlpha()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
