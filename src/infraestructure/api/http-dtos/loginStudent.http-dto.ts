import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginStudentHttpDto {
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string
}
