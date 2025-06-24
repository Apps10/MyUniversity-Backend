import { Module } from '@nestjs/common'
import { JwtModule, JwtService as NestJwtService } from '@nestjs/jwt'
import { JWT_SECRET } from 'src/shared/config'
import { BcryptHashServiceAdapter, JwtServiceAdapter } from '../adapter'
import { PrismaService, BcryptService } from 'src/shared/services'
import {
  ProgramPrismaRepository,
  StudentPrismaRepository,
  SubjectPrismaRepository,
} from '../repositories'
import {
  AuthUseCaseFactoryImp,
  SubjectUseCaseFactoryImp,
  StudentUseCaseFactoryImp,
} from '../factories'
import {
  RegisterStudentController,
  LoginStudentController,
  GetAllSubjectController,
  EnrollStudentToSubjectController,
  GetClassmateNameInSameSubjectController,
} from '../api/controllers'
import {
  PROGRAM_REPOSITORY,
  ProgramRepository,
  STUDENT_REPOSITORY,
  StudentRepository,
  SUBJECT_REPOSITORY,
  SubjectRepository,
} from 'src/domain/repositories'
import {
  HASH_SERVICE,
  HashService,
  JWT_SERVICE,
  JwtService,
} from 'src/domain/services'
import {
  STUDENT_USE_CASE_FACTORY,
  SUBJECT_USE_CASE_FACTORY,
  AUTH_USE_CASE_FACTORY,
} from 'src/application/factories'
import { PROGRAM_USE_CASE_FACTORY } from 'src/application/factories/programUseCase.factory'
import { ProgramUseCaseFactoryImp } from '../factories/programUseCase.factory'
import { GetAllProgramController } from '../api/controllers/getAllProgram.controller'

@Module({
  imports: [
    PrismaService,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    LoginStudentController,
    RegisterStudentController,
    GetAllSubjectController,
    EnrollStudentToSubjectController,
    GetClassmateNameInSameSubjectController,
    GetAllProgramController,
  ],
  providers: [
    PrismaService,
    BcryptService,
    StudentPrismaRepository,
    AuthUseCaseFactoryImp,
    SubjectUseCaseFactoryImp,
    {
      provide: STUDENT_REPOSITORY,
      useFactory: (prismaService: PrismaService) =>
        new StudentPrismaRepository(prismaService),
      inject: [PrismaService],
    },
    {
      provide: SUBJECT_REPOSITORY,
      useFactory: (prismaService: PrismaService) =>
        new SubjectPrismaRepository(prismaService),
      inject: [PrismaService],
    },
    {
      provide: PROGRAM_REPOSITORY,
      useFactory: (prismaService: PrismaService) =>
        new ProgramPrismaRepository(prismaService),
      inject: [PrismaService],
    },
    {
      provide: JWT_SERVICE,
      useFactory: (jwt: NestJwtService) => new JwtServiceAdapter(jwt),
      inject: [NestJwtService],
    },
    {
      provide: HASH_SERVICE,
      useFactory: (bcryptService: BcryptService) =>
        new BcryptHashServiceAdapter(bcryptService),
      inject: [BcryptService],
    },
    {
      provide: AUTH_USE_CASE_FACTORY,
      useFactory: (
        studentRepo: StudentRepository,
        programRepo: ProgramRepository,
        hashService: HashService,
        jwtService: JwtService,
      ) =>
        new AuthUseCaseFactoryImp(
          studentRepo,
          programRepo,
          hashService,
          jwtService,
        ),
      inject: [
        STUDENT_REPOSITORY,
        PROGRAM_REPOSITORY,
        HASH_SERVICE,
        JWT_SERVICE,
      ],
    },
    {
      provide: STUDENT_USE_CASE_FACTORY,
      useFactory: (
        studentRepo: StudentRepository,
        subjectRepo: SubjectRepository,
      ) => new StudentUseCaseFactoryImp(studentRepo, subjectRepo),
      inject: [STUDENT_REPOSITORY, SUBJECT_REPOSITORY],
    },
    {
      provide: SUBJECT_USE_CASE_FACTORY,
      useFactory: (subjectRepo: SubjectRepository) =>
        new SubjectUseCaseFactoryImp(subjectRepo),
      inject: [SUBJECT_REPOSITORY],
    },
    {
      provide: PROGRAM_USE_CASE_FACTORY,
      useFactory: (programRepo: ProgramRepository) =>
        new ProgramUseCaseFactoryImp(programRepo),
      inject: [PROGRAM_REPOSITORY],
    },
  ],
  exports: [AUTH_USE_CASE_FACTORY],
})
export class CommonModule {}
