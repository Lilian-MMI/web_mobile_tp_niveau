import router from '@/router';
import ky, { HTTPError } from 'ky';
import { Input } from 'ky/distribution/types/options';
import { API_URI } from '~/config';

const hooks = {
  beforeRequest: [
    (request: any) => {
      const token = localStorage.getItem('apiKey');
      request.headers.set('x-api-key', token);
    },
  ],

  afterResponse: [
    (
      _request: Input,
      _options: any,
      response: { status: number; ok: boolean }
    ) => {
      if (response.status === 401) {
        router.replace('/login');
      }
    },
  ],

  beforeError: [
    async (error: HTTPError) => {
      const { response } = error;
      if (response && response.body) {
        const body = await response.json();
        error = body;
      }

      return error;
    },
  ],
};

export const kyApi = ky
  .create({
    prefixUrl: API_URI,
    headers: {
      'content-type': 'application/json',
    },
  })
  .extend({
    hooks,
  });
