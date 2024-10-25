import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles_key } from "../decorators/roles.decorator";


@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}

    matchRoles(roles: string[], userRole: string){
        return roles.some(r => r === userRole);
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requireRoles = this.reflector.getAllAndOverride<string[]>(
            Roles_key,
            [context.getHandler(), context.getClass()],
        );
        if(!requireRoles){
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

       return this.matchRoles(requireRoles, user.role)
    }
} 