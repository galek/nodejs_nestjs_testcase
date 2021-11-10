import { createParamDecorator } from '@nestjs/common';

export const DebugHttp = createParamDecorator((data, ctx) => {
  if (process?.env?.NODE_ENV !== 'development') {
    return undefined;
  }
  const req = ctx.switchToHttp().getRequest();

  return {
    query: req.query,
    params: req.params,
    body: req.body,
  };
});
