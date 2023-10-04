class Env {
  get apiHost() {
    return process.env.REACT_APP_API_HOST || 'http://0.0.0.0';
  }

  get apiPort() {
    return process.env.REACT_APP_API_PORT || '81';
  }

  get apiPrefix() {
    return process.env.REACT_APP_API_PREFIX || '';
  }

  get(variable: string) {
    return process.env[variable];
  }
}

export default new Env();
