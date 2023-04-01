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
  constructor(endpoint) {
    /** @type {string} */
    this.loginId = localStorage.getItem('loginId');

    /** @type {string} */
    this.endpoint = endpoint || import.meta.env.VITE_API_ENDPOINT || 'https://api.lendr.cc/v1';
  }

  /**
   * A shallow check to see if a user is logged in.
   * @returns {boolean}
   */
  isLoggedIn() {
    return this.loginId != undefined;
  }

  /**
   * Sends a GET request to the server.
   * 
   * @param {string} path 
   * @param {object} options
   * @param {boolean} [options.requireAuth]
   * @returns {Promise<Response|null>}
   */
  async get(path, options = {}) {
    /** @type {RequestInit} */
    let init = {
      method: 'GET',
      headers: {}
    };
    if (options.requireAuth && this.isLoggedIn()) {
      init.headers['Authorization'] = `Bearer ${this.loginId}`;
    }
    else {
      return null;
    }

    // Call fetch.
    const res = await fetch(`${this.endpoint}${path}`, init);

    // Logout user if user isn't found.
    if (res.status == 401 && options.requireAuth) {
      this._clearLogin();
    }

    // Return result.
    return res;
  }

  /**
   * Gets all the members. This method requires authentication.
   * 
   * @returns {Promise<any[]|null>}
   */
  async getAllMembers() {
    const res = await this.get('/member/all', { requireAuth: true });
    if (res == null) {
      return null;
    }
    else {
      return (await res.json()).members;
    }
  }
  /**
   * Gets all the borrowers. This method requires authentication.
   * @returns {Promise<any[]|null>}
   */
  async getAllBorrowers() {
    let members = await this.getAllMembers();
    if (members) {
      members = members.filter(b => b.role == 'borrower').sort((a, b) => {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      });
    }

    return members;
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

    // Call fetch.
    const res = await fetch(`${this.endpoint}${path}`, init);

    // Logout user if user isn't found.
    if (res.status == 401 && options.requireAuth) {
      this._clearLogin();
    }

    // Return result.
    return res;
  }

  /**
   * Attempts to log in and returns
   * 
   * @param {string} username
   * @param {string} password
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
      this._setLogin(data._id);
    }
    return data;
  }
  /**
   * Attempts to logout.
   */
  async logout() {
    const res = await this.post('/member/logout', {}, {
      requireAuth: true
    });

    this._clearLogin();

    return res;
  }
  /**
   * Sets the loginId and localStorage.
   */
  _setLogin(loginId) {
    this.loginId = loginId;
    localStorage.setItem('loginId', loginId);
  }
  /**
   * Resets loginId and removes from localStorage.
   */
  _clearLogin() {
    this.loginId = undefined;
    localStorage.removeItem('loginId');
  }
}

export default LendrClient;