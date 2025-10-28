import assert from 'assert';
import { POST } from '../app/api/generate-prompt/route.js';
import { headers } from 'next/headers';

// Mocking next/headers
jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

// Mocking fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ choices: [{ message: { content: 'A beautiful cat sitting on a plush mat' } }] }),
  })
);

describe('POST /api/generate-prompt', () => {
  beforeEach(() => {
    process.env.OPENROUTER_API_KEY = 'test-key';
  });

  it('should return a prompt with a 200 status code', async () => {
    // Mock the headers
    const headersMap = new Map();
    headersMap.set('host', 'localhost:3000');
    headers.mockReturnValue(headersMap);

    // Mock the request
    const req = {
      json: async () => ({
        input: 'A cat sitting on a mat'
      }),
    };

    // Mock the response
    const response = await POST(req);
    const responseBody = await response.json();

    assert.strictEqual(response.status, 200, `Expected status code 200, but got ${response.status}`);
    assert(responseBody.prompt, 'The response should contain a prompt');
  });
});
