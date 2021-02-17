export default class RestManager {
  private base: any;
  private headers: any;
  constructor(arg: { uri: string; headers?: any }) { 
    this.base = arg?.uri;
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...arg?.headers,
    };
  }

  private getUrl(path: string) {
    return `${this.base}${path}`;
  }

  private handleError(error: any) {
    console.log(error.message);
    return error;
  }

  async query(path: string) {
    try {
      return await this.request("GET", path);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async mutate(verb: "POST" | "PUT" | "DELETE", path: string, data: any) {
    try {
      return await this.request(verb, path, data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async request(
    verb: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    data?: any
  ) {
    try {
      const url = this.getUrl(path); 
      return await fetch(url, {
        headers: this.headers,
        method: verb,
        body: JSON.stringify(data || {}),
      });
    } catch (error) {
      return this.handleError(error);
    }
  }
}
