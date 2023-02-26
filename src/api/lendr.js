/**
 * @typedef {object} LoginResponse
 * @property {string} [_id]
 * @property {string} [expires]
 * @property {string} [resetFlag]
 * @property {string} [err]
 */

/**
 * A class for api.lendr.cc requests.
 */
class LendrClient {
  constructor(loginId, endpoint) {
    /** @type {string} */
    this.loginId = loginId || localStorage.getItem('loginId');
    /** @type {string} */
    this.endpoint = endpoint || 'https://api.lendr.cc/v1'
  }

  /**
   * Sends a GET request to the server.
   * 
   * @param {string} path 
   * @param {boolean} requireAuth 
   * @returns {Promise<Response>}
   */
  async get(path, options = {}) {
    /** @type {RequestInit} */
    let init = {
      method: options.method || 'POST',
      headers: {},
      body: JSON.stringify(data)
    };
    if (options.requireAuth) {
      init.headers['Authorization'] = `Bearer ${this.loginId}`;
    }

    // Call fetch.
    return fetch(`${this.endpoint}${path}`, init);
  }
  /**
   * Sends a POST request to the server.
   * 
   * @param {string} path 
   * @param {*} data 
   * @param {object} options 
   * @param {string} [options.method]
   * @param {boolean} [options.requireAuth]
   */
  async post(path, data, options = {}) {
    /** @type {RequestInit} */
    let init = {
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    if (options.requireAuth) {
      init.headers['Authorization'] = `Bearer ${this.loginId}`;
    }

    // Call fetch
    return fetch(`${this.endpoint}${path}`, init);
  }

  /**
   * Attempts to log in and returns
   * 
   * @param {string} username
   * @param {string} password
   * @returns {Promise<LoginResponse>} An object with the login state.
   */
  async login(username, password) {
    const response = await this.post('/member/login', {
      username: username,
      password: password
    });

    /**
     * @type {LoginResponse}
     */
    const data = await response.json();
    if (data._id) {
      this.loginId = data._id;
      localStorage.setItem('loginId', this.loginId);
    }
    return data;
  }
}

export default LendrClient;