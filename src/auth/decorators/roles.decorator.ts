import { SetMetadata } from "@nestjs/common";
import { ROLE } from "../entities/user-role.enum";

export const RolesDecorator = (...roles: ROLE[]) => SetMetadata('roles', roles);