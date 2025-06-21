import { Program } from './program'
import { Subject } from './subject'

const DocumentTypeArray = ['CC', 'TI', 'CE'] as const

export type UserRole = (typeof DocumentTypeArray)[number]
export type DocumentType = 'CC' | 'TI' | 'CE'

export interface IStudentPrimitive {
  id: string
  name: string
  lastname: string
  documentType: DocumentType
  documentNumber: string
  email: string
  password: string
  program: Program
  subjects: Subject[]
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
    public program: Program,
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

    if (this.name.length < 2 || typeof this.name != 'string') {
      throw new Error('name must be a string of at least 2 characters')
    }

    if (this.lastname.length < 5 || typeof this.name != 'string') {
      throw new Error('lastname must be a string of at least 5 characters')
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

    if (this.email.length < 5 || typeof this.email != 'string') {
      const emailRegex =
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
      if (!emailRegex.test(this.email)) {
        throw new Error('email is Invalid')
      }
    }

    if (this.password.length < 8 || typeof this.password != 'string') {
      throw new Error('password must be a string of at least 8 characters')
    }

    if (!this.program) {
      //TODO: should validate something
    }
  }

  private ensureMaxSubjects() {
    if (this.subjects.length > 3) {
      throw new Error('A student can only enroll in up to 3 subjects.')
    }
  }

  private ensureNoRepeatedTeachers() {
    const teacherIds = this.subjects.map((s) => s.teacher.id)
    const uniqueTeachers = new Set(teacherIds)
    if (teacherIds.length !== uniqueTeachers.size) {
      throw new Error('Subjects must be taught by different teachers.')
    }
  }

  changePassword(newPassword: string) {
    this.password = newPassword
  }

  enrollNewSubject(subject: Subject) {
    this.subjects.push(subject)
    this.ensureMaxSubjects()
    this.ensureNoRepeatedTeachers()
  }
}
