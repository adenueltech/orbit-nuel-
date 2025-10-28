import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const host = req.headers.host || '';
    const organizationId = req.headers['x-organization-id'] as string;

    if (!host) {
      next();
      return;
    }

    const subdomain = host.split('.')[0];
    req['tenant'] = {
      subdomain,
      organizationId: organizationId ? parseInt(organizationId) : null
    };
    next();
  }
}