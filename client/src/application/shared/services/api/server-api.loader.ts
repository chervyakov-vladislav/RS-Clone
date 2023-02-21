import storage from '../../components/local-storage';
import { TSObject, Method, ResponseData } from '../../models/base-types';

const PATH = 'http://localhost:3000/api/';
// const PATH = 'http://146.255.188.74:3000/api/';

class Loader {
  private errorHandler(res: Response): Response {
    // if (!res.ok) {
    //   res
    //     .clone()
    //     .json()
    //     .then((data) => {
    //       throw Error(data.errors);
    //     });
    // }

    return res;
  }

  private load(url: URL, method: Method, data?: TSObject): Promise<Response> {
    console.log(url.href, method, data);
    return fetch(url, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${storage.getToken()}` },
      method,
      body: data ? JSON.stringify(data) : undefined,
    }).then((res: Response) => this.errorHandler(res));
  }

  private makeUrl(endpoint: string, params: TSObject) {
    let url = `${PATH}${endpoint}?`;

    Object.keys(params).forEach((key) => {
      url += `${key}=${params[key]}&`;
    });

    return new URL(url.slice(0, -1));
  }

  public getData<T>(endpoint: string, params: TSObject): Promise<ResponseData<T>> {
    return this.load(this.makeUrl(endpoint, params), 'GET').then((res: Response) =>
      res.json().then((items) => {
        const total = res.headers.get('X-Total-Count');
        return {
          total: total ? +total : 0,
          items: Array.from(items),
        };
      })
    );
  }

  public get<T>(endpoint: string, params: TSObject): Promise<T> {
    return this.load(this.makeUrl(endpoint, params), 'GET').then((res: Response) => res.json());
  }

  public post<T>(endpoint: string, data: TSObject): Promise<T> {
    console.log(endpoint, data);
    return this.load(new URL(`${PATH}${endpoint}`), 'POST', data).then((res: Response) => res.json());
  }

  public put<T>(endpoint: string, data: TSObject): Promise<T> {
    return this.load(new URL(`${PATH}${endpoint}`), 'PUT', data).then((res: Response) => res.json());
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.load(new URL(`${PATH}${endpoint}`), 'DELETE').then((res: Response) => res.json());
  }

  public patch<T>(endpoint: string, params: TSObject): Promise<T> {
    return this.load(this.makeUrl(endpoint, params), 'PATCH').then((res: Response) => res.json());
  }
}

const apiLoader = new Loader();
export default apiLoader;
