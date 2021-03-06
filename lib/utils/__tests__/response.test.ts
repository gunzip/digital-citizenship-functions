// tslint:disable:no-any

import * as Express from "express";

import { response as MockResponse } from "jest-mock-express";

import { none, some } from "ts-option";
import { right } from "../either";

import { ResponseSuccessJson, ResponseSuccessJsonIterator } from "../response";

function flushPromises<T>(): Promise<T> {
  return new Promise(resolve => setImmediate(resolve));
}

describe("ResponseSuccessJson", () => {
  it("should remove the kind property", () => {
    const kindlessData = {
      a: 1,
      b: "2"
    };

    const kindedData = {
      ...kindlessData,
      kind: "I_AM_UNIQUE"
    };

    const mockResponse = (MockResponse() as any) as Express.Response;

    const jsonResponse = ResponseSuccessJson(kindedData);

    jsonResponse.apply(mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(kindlessData);
  });
});

describe("ResponseSuccessJsonIterator", () => {
  it("should stream an empty iterator as json", async () => {
    const mockIterator = {
      executeNext: jest.fn(() => Promise.resolve(right(some([]))))
    };

    const streamingResponse = ResponseSuccessJsonIterator(mockIterator);

    const mockResponse = (MockResponse() as any) as Express.Response;

    streamingResponse.apply(mockResponse);

    await flushPromises();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([]);
  });

  it("should stream an iterator with a single page as json", async () => {
    const mockIterator = {
      executeNext: jest.fn()
    };

    mockIterator.executeNext.mockImplementationOnce(() =>
      Promise.resolve(right(some([{ data: "a" }])))
    );
    mockIterator.executeNext.mockImplementationOnce(() =>
      Promise.resolve(right(none))
    );

    const streamingResponse = ResponseSuccessJsonIterator(mockIterator);

    const mockResponse = (MockResponse() as any) as Express.Response;

    streamingResponse.apply(mockResponse);

    await flushPromises();
    expect(mockIterator.executeNext).toHaveBeenCalledTimes(2);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([{ data: "a" }]);
  });

  it("should remove the kind attribute", async () => {
    const mockIterator = {
      executeNext: jest.fn()
    };

    mockIterator.executeNext.mockImplementationOnce(() =>
      Promise.resolve(
        right(
          some([
            {
              data: "a",
              kind: "IResponse"
            }
          ])
        )
      )
    );
    mockIterator.executeNext.mockImplementationOnce(() =>
      Promise.resolve(right(none))
    );

    const streamingResponse = ResponseSuccessJsonIterator(mockIterator);

    const mockResponse = (MockResponse() as any) as Express.Response;

    streamingResponse.apply(mockResponse);

    await flushPromises();
    expect(mockResponse.json).toHaveBeenCalledWith([{ data: "a" }]);
  });
});
