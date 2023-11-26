import '@testing-library/jest-dom/vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import React from 'react';
import { expect } from 'vitest';
import { rest } from 'msw';
import { SetupServer, setupServer } from 'msw/node';
import 'whatwg-fetch';
import { BeerDetails } from './api/BeerAPI';
import { items } from './__tests__/mocks';

expect.extend(matchers);

global.React = React;

export const testItem: BeerDetails = items[0];

const server: SetupServer = setupServer(
  rest.get('https://api.punkapi.com/v2/beers/', (req, res, ctx) => {
    return res(ctx.json([testItem]));
  }),
  rest.get('https://api.punkapi.com/v2/beers/2', (req, res, ctx) => {
    return res(ctx.json([testItem]));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());
