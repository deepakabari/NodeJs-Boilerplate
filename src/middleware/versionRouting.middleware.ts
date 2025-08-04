import { NextFunction, Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import MESSAGES from '../constants/message.constant';

type RouterMap = Record<string, Router>;

async function loadVersionedRouters(): Promise<{ routers: RouterMap; sortedVersions: string[] }> {
  const apiBasePath = path.join(__dirname, '../api');
  const routers: RouterMap = {};
  const versionDirectories = fs.readdirSync(apiBasePath).filter((dir) => /^v\d+$/i.test(dir));

  const sortedVersions = versionDirectories
    .map((v) => v.toLowerCase())
    .sort((a, b) => {
      const aNum = parseInt(a.slice(1));
      const bNum = parseInt(b.slice(1));
      return bNum - aNum;
    });

  for (const version of sortedVersions) {
    const routePath = path.join(apiBasePath, version, 'routes', 'route.ts');

    if (fs.existsSync(routePath)) {
      try {
        const routerModule = (await import(routePath)) as { default: Router };
        const router = routerModule.default;

        if (typeof router === 'function') {
          routers[version] = router;
        }
      } catch (error) {
        console.warn(`Failed to load router for ${version}:`, error);
      }
    }
  }
  return { routers, sortedVersions: [...sortedVersions].reverse() };
}

const handlerPromise = loadVersionedRouters().then(({ routers, sortedVersions }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestedVersion = (req.header('x-api-version') || 'v1')?.toLowerCase();

    if (!routers[requestedVersion]) {
      return res.status(404).json({
        success: false,
        message: MESSAGES.VERSION_NOT_FOUND
      });
    }

    const fallbackChain = sortedVersions.filter((v) => v <= requestedVersion).reverse();

    const tryNextRouter = (index = 0): void => {
      const version = fallbackChain[index];
      const router = routers[version];

      if (!router) {
        return tryNextRouter(index + 1);
      }

      router(req, res, (err) => {
        if (err) return next(err);
        if (!res.headersSent && index + 1 < fallbackChain.length) {
          tryNextRouter(index + 1);
        } else if (!res.headersSent) {
          res.status(404).json({
            success: false,
            message: MESSAGES.ROUTE_NOT_FOUND
          });
        }
      });
    };

    tryNextRouter();
  };
});

const versionedRouteHandler = async (req: Request, res: Response, next: NextFunction) => {
  const handler = await handlerPromise;
  return handler(req, res, next);
};

export default versionedRouteHandler;
