import { StudentCantEnrollSubjectException } from '../exceptions'
import { SubjectAlreadyHasRegisteredTeacherException } from '../exceptions/subject.exception'
import { ISubjectPrimitive, Subject } from './subject'

export const DocumentTypeArray = ['CC', 'TI', 'CE'] as const

export type DocumentType = (typeof DocumentTypeArray)[number]
export interface IStudentPrimitive {
  id: string
  name: string
  lastname: string
  documentType: DocumentType
  documentNumber: string
  email: string
  password: string
  programId: string
  subjects: ISubjectPrimitive[]
}

export class Student {
  constructor(
    public readonly id: string,
    public name: string,
    public lastname: string,
    public documentType: DocumentType,
    public documentNumber: string,
    public email: string,
    public password: string,
    public programId: string,
    public subjects: Subject[] = [],
  ) {
    this.ensureIsValid()
    this.ensureMaxSubjects()
    this.ensureNoRepeatedTeachers()
  }

  private ensureIsValid() {
    const idRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (!idRegex.test(this.id)) {
      throw new Error('id should be an UUID')
    }

    if (
      (this.name.length < 2 && this.name.length > 20) ||
      typeof this.name != 'string'
    ) {
      throw new Error('name must be a string between 2 and 20 characters')
    }

    if (
      (this.lastname.length < 5 && this.lastname.length > 20) ||
      typeof this.lastname != 'string'
    ) {
      throw new Error('lastname must be a string between 5 and 20 characters')
    }

    if (!DocumentTypeArray.includes(this.documentType)) {
      throw new Error('documentType is invalid')
    }

    if (
      (this.documentNumber.length < 7 && this.documentNumber.length > 13) ||
      typeof this.documentNumber != 'string'
    ) {
      throw new Error(
        'documentNumber must be a string between 7 and 13 characters',
      )
    }

    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    if (
      (this.email.length < 5 && this.email.length > 30) ||
      typeof this.email != 'string' ||
      !emailRegex.test(this.email)
    ) {
      throw new Error('email is Invalid')
    }

    this.ensurePasswordIsValid()

    if (!idRegex.test(this.programId)) {
      throw new Error('programId should be an UUID')
    }
  }

  changePassword(newPassword: string) {
    this.password = newPassword
    this.ensureIsValid()
  }

  private ensurePasswordIsValid() {
    if (
      (this.documentNumber.length < 8 && this.documentNumber.length > 20) ||
      typeof this.password != 'string'
    ) {
      throw new Error('password must be a string between 8 and 20 characters')
    }
  }

  private ensureMaxSubjects() {
    if (this.subjects.length > 3) {
      throw new StudentCantEnrollSubjectException()
    }
  }

  private ensureNoRepeatedTeachers() {
    const teacherIds = this.subjects.map((s) => s.teacher.id)
    const uniqueTeachers = new Set(teacherIds)
    if (teacherIds.length !== uniqueTeachers.size) {
      throw new SubjectAlreadyHasRegisteredTeacherException()
    }
  }

  enrollNewSubject(subject: Subject) {
    this.subjects.push(subject)
    this.ensureMaxSubjects()
    this.ensureNoRepeatedTeachers()
  }
}
