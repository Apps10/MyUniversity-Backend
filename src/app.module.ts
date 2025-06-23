import { Module } from '@nestjs/common'
import { CommonModule } from './infraestructure/modules'

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
