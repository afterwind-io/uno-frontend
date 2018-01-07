import io from 'socket.io-client';
import * as Config from '../config';

interface IWsResponse<T> {
  code: number;
  payload: T;
}

interface IEventOption<T> {
  event: string
  handler: (param: T) => void
  override: boolean
}

function isOk(code: number) {
  return code === 0;
}

class WebsocketService {
  private queue: Set<string> = new Set();
  private ws: SocketIOClient.Socket;
  private token: string = '';
  private lazyEvents: IEventOption<any>[] = []

  get socketId(): string {
    return this.ws.id;
  }

  public connect(): void {
    this.ws = io(Config.host);
    this.registerLazyEvents()
  }

  public disconnect(): void {
    this.ws.disconnect();
    this.ws = null;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public send<T = any>(api: string, param: any = ''): Promise<T> {
    if (this.queue.has(api)) throw new Error();

    return new Promise((resolve, reject) => {
      this.queue.add(api);

      let packet = { token: this.token, route: api, param };
      this.ws.emit('request', packet, (res: IWsResponse<T>) => {
        this.queue.delete(api);

        console.log(res);
        isOk(res.code) ? resolve(res.payload) : reject(res);
      });
    });
  }

  public on<T = any>(event: string, handler: (param: T) => void, override: boolean = true) {
    if (this.ws === void 0) {
      this.cacheLazyEventHanlder(event, handler, override);
    } else {
      this.registerEventHandler(event, handler, override)
    }
  }

  private registerEventHandler(event: string, handler: (param: any) => void, override: boolean) {
    if (override) {
      this.ws.off(event);
    }

    this.ws.on(event, handler);
  }

  private cacheLazyEventHanlder(event: string, handler: (param: any) => void, override: boolean) {
    this.lazyEvents.push({
      event, handler, override
    })
  }

  private registerLazyEvents() {
    if (this.lazyEvents.length !== 0) {
      this.lazyEvents.forEach((lasy) => {
        this.registerEventHandler(lasy.event, lasy.handler, lasy.override)
      });
    }
    this.lazyEvents = [];
  }
}

export default new WebsocketService();
