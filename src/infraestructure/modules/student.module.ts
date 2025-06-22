import { Module } from '@nestjs/common'
import { JwtModule, JwtService as NestJwtService } from '@nestjs/jwt'
import {
  RegisterStudentController,
  LoginStudentController,
} from '../api/controllers'
import { StudentPrismaRepository } from '../repositories'
import { BcryptService, PrismaService } from 'src/shared/services'
import { JWT_SECRET } from 'src/shared/config'
import { BcryptHashServiceAdapter, JwtServiceAdapter } from '../adapter'
import { STUDENT_USE_CASE_FACTORY } from 'src/application/factories'
import { StudentUseCaseFactoryImp } from '../factories'
import { STUDENT_REPOSITORY, StudentRepository } from 'src/domain/repositories'
import {
  HASH_SERVICE,
  HashService,
  JWT_SERVICE,
  JwtService,
} from 'src/domain/services'

@Module({
  imports: [
    PrismaService,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LoginStudentController, RegisterStudentController],
  providers: [
    PrismaService,
    BcryptService,
    StudentPrismaRepository,
    StudentUseCaseFactoryImp,
    {
      provide: STUDENT_REPOSITORY,
      useFactory: (prismaService: PrismaService) =>
        new StudentPrismaRepository(prismaService),
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
      provide: STUDENT_USE_CASE_FACTORY,
      useFactory: (
        studentRepo: StudentRepository,
        hashService: HashService,
        jwtService: JwtService,
      ) => new StudentUseCaseFactoryImp(studentRepo, hashService, jwtService),
      inject: [STUDENT_REPOSITORY, HASH_SERVICE, JWT_SERVICE],
    },
  ],
  exports: [STUDENT_USE_CASE_FACTORY],
})
export class StudentModule {}
