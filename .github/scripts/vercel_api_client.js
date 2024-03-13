const axios = require("axios");

class VercelApiClient {
  constructor(vercel_token, vercel_org_id, vercel_project_id, env) {
    this.vercel_token = vercel_token;
    this.vercel_org_id = vercel_org_id;
    this.vercel_project_id = vercel_project_id;
    this.env = env;

    this.client = axios.create({
      baseURL: "https://api.vercel.com",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.vercel_token}`,
      },
    });
  }

  async addEnvironmentVar(key, value) {
    return this.doRequest(
      "POST",
      `/v10/projects/${this.vercel_project_id}/env?teamId=${this.vercel_org_id}`,
      {
        key,
        value,
        target: [this.env],
        type: "encrypted",
      }
    );
  }

  async getEnvironmentVars() {
    const { envs } = await this.doRequest(
      "GET",
      `/v9/projects/${this.vercel_project_id}/env?teamId=${this.vercel_org_id}`
    );
    return envs;
  }

  async deleteEnvironemntVar(id) {
    return this.doRequest(
      "DELETE",
      `/v9/projects/${this.vercel_project_id}/env/${id}?teamId=${this.vercel_org_id}`
    );
  }

  async editEnvironmentVar(id, key, value) {
    return this.doRequest(
      "PATCH",
      `/v9/projects/${this.vercel_project_id}/env/${id}?teamId=${this.vercel_org_id}`,
      {
        key,
        value,
        target: [this.env],
        type: "encrypted",
      }
    );
  }


  async doRequest(method, url, payload = {}) {
    const config = {
      url,
      method,
      data: payload,
    };

    const { data } = await this.client(config);

    return data;
  }


}

module.exports = { VercelApiClient };
