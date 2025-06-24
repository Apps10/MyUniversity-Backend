import { DocumentType, DocumentTypeArray } from 'src/domain/entities'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator'

export class RegisterStudentHttpDto {
  @IsNotEmpty()
  @IsUUID()
  id: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  lastname: string

  @IsNotEmpty()
  @IsString()
  @IsEnum(DocumentTypeArray)
  documentType: DocumentType

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(13)
  documentNumber: string

  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(30)
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string

  @IsNotEmpty()
  @IsUUID()
  programId: string
}
