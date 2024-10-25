import { SetMetadata } from '@nestjs/common';

export const Roles_key = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(Roles_key, roles);
