import { DocumentType, DocumentTypeArray } from 'src/domain/entities'
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class RegisterStudentHttpDto {
  @IsNotEmpty()
  @IsUUID()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  lastname: string

  @IsNotEmpty()
  @IsString()
  @IsEnum(DocumentTypeArray)
  documentType: DocumentType

  @IsNotEmpty()
  @IsString()
  documentNumber: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsUUID()
  programId: string
}
