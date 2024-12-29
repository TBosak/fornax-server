import { OpenAPIHono } from "@hono/zod-openapi";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

let _app: App | null = null;

class App {
  hono = new OpenAPIHono();
  modelRegistry = new Map();
  metadataRegistry = new Map<
    string,
    Record<string, { type: z.ZodTypeAny; openapi: any }>
  >();
  openAPIRegistry = new OpenAPIRegistry();
  controllerRegistry = new Map<string, any>();
  routeRegistry = new Map<string, any>();

  registerController(path: string, controller: any) {
    this.controllerRegistry.set(path, controller);
  }

  registerModel(name: string, model: any) {
    this.modelRegistry.set(name, model);
  }

  registerOpenAPI(name: string, openAPI: any) {
    this.openAPIRegistry.register(name, openAPI);
  }

  registerRoute(name: string, route: any) {
    this.routeRegistry.set(name, route);
  }

  registerMetadata(name: string, metadata: any) {
    this.metadataRegistry.set(name, metadata);
  }
}

export function getAppInstance(): App {
  if (!_app) {
    _app = new App();
  }
  return _app;
}
