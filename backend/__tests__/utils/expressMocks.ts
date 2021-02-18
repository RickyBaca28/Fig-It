/* eslint-disable @typescript-eslint/no-explicit-any */
interface MockedRequest {
    body: jest.Mock<any, any>;
    params: any;
    query: any;
    app: any;
    header: any;
    cookies: any;
    id: any;
}

export const mockRequest = (
    params?: any,
    query?: any,
    body?: any,
    app?: any,
    cookies?: any,
    id?: any,
): MockedRequest => {
    const req: MockedRequest = {} as any;

    req.body = body || {};
    req.query = query || {};
    req.params = params || {};
    req.app = app || { locals: {} };
    req.header = jest.fn();
    req.cookies = cookies || {};
    req.id = id || {};

    return req;
};

interface MockedResponse {
    send: jest.Mock<any, any>;
    status: jest.Mock<any, any>;
    json: jest.Mock<any, any>;
    set: jest.Mock<any, any>;
    sendFile: jest.Mock<any, any>;
    locals: any;
    statusCode: number;
    cookie: any;
    clearCookie: any;
    end: any;
}

export const mockResponse = (locals?: any, statusCode?: number): MockedResponse => {
    const res: MockedResponse = {} as any;

    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.set = jest.fn().mockReturnValue(res);
    res.sendFile = jest.fn().mockReturnValue(res);
    res.locals = locals ?? {};
    res.statusCode = statusCode ?? 200;
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn();
    res.end = jest.fn();
    return res;
};

export const mockNext = (): jest.Mock<any, any> => jest.fn();