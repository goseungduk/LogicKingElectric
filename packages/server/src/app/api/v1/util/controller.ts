import { EndpointEntry } from "@electric/shared/src/api/v1/util";
import { DataAccess } from "../../../../service/dataAccess/types";

export interface ServiceFacade {
    dataAccess: DataAccess;
}

export interface Request<Data> {
    data: Data;
}
export interface RequestHandler<RequestData, ResponseData> {
    (request: Request<RequestData>, services: ServiceFacade): Promise<ResponseData>;
}

export interface Controller {
    handler: RequestHandler<unknown, unknown>;
    endpoint: EndpointEntry;
    flags: {
        needAuth: boolean;
    };
}

export function createNoAuthController<Req, Res>(
    endpoint: EndpointEntry,
    handler: RequestHandler<Req, Res>,
): Controller {
    return {
        handler: handler as RequestHandler<unknown, unknown>,
        endpoint: endpoint,
        flags: {
            needAuth: false,
        },
    };
}

const controllers: Controller[] = [];

export function registerController(controller: Controller): void {
    controllers.push(controller);
}

export function getControllers(): Controller[] {
    return [...controllers];
}