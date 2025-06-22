import { Module } from '@nestjs/common'
import { StudentModule } from './infraestructure/modules/student.module'

@Module({
  imports: [StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
