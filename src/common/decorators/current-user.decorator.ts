import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        const ctxType = context.getType();
        if (ctxType === 'http') {
            const request = context.switchToHttp().getRequest();
            return request.user;
          }
    }
);