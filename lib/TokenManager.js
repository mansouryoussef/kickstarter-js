const Configstore = require("configstore");
const pkg = require("../package.json");

class TokenManager {
  constructor() {
    this.conf = new Configstore(pkg.name);
  }

  setToken(token) {
    this.conf.set("apiToken", token);

    return token;
  }

  getToken() {
    const token = this.conf.get("apiToken");

    if (!token) {
      throw new Error("No token found!");
    }

    return token;
  }

  deleteToken() {
    this.conf.delete("apiToken");

    return;
  }
}

module.exports = TokenManager;
