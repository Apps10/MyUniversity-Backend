import { IsEmail, IsString } from 'class-validator'

export class LoginStudentHttpDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string
}