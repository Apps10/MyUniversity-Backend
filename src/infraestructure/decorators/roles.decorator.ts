import { SetMetadata } from '@nestjs/common'
import { UserRole } from 'src/domain/entities'

export const AllowRoles = (...roles: UserRole[]) => SetMetadata('roles', roles)
