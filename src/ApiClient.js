const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class ApiClient {
  constructor(onError) {
    this.onError = onError;
    this.base_url = BASE_API_URL + '/api';
  }

  async request(options) {
    let response = await this.internalRequest(options);
    if (response.status === 401 && !options.url.startsWith('/tokens/')) {
      const refreshResponse = await this.post('/tokens/refresh/', {
        refresh: localStorage.getItem('refreshToken'),
      });
      if (refreshResponse.ok) {
        localStorage.setItem('accessToken', refreshResponse.body.access);
        localStorage.setItem('refreshToken', refreshResponse.body.refresh);
        response = await this.internalRequest(options);
      }
    }
    if (response.status >= 500 && this.onError) {
      this.onError(response);
    }
    return response;
  }

  async internalRequest(options) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== '') {
      query = '?' + query;
    }

    let response;
    try {
      const accessToken = localStorage.getItem('accessToken');
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken ? `Bearer ${accessToken}` : null,
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    }
    catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => {
          return {
            code: 500,
            message: 'The server is unresponsive',
            description: error.toString(),
          };
        },
      };
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null,
    };
  }

  async get(url, query, ...options) {
    return this.request({ method: 'GET', url, query, ...options });
  }

  async post(url, body, ...options) {
    return this.request({ method: 'POST', url, body, ...options });
  }

  async put(url, body, ...options) {
    return this.request({ method: 'PUT', url, body, ...options });
  }

  async delete(url, ...options) {
    return this.request({ method: 'DELETE', url, ...options });
  }

  async login(username, password) {
    const response = await this.post('/tokens/', {
      username,
      password
    });
    if (response.ok) {
      localStorage.setItem('accessToken', response.body.access);
      localStorage.setItem('refreshToken', response.body.refresh);
      return 'ok';
    }
    return response.status === 401 ? 'fail' : 'error';
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated() {
    return localStorage.getItem('accessToken') !== null;
  }
}