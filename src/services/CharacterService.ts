import { inject, injectable } from "inversify";
import md5 from "crypto-js/md5";

import { ServiceInterfaceTypes } from "../service-container/ServiceTypes";

import { CharacterServiceInterface } from "./interfaces/CharacterServiceInterface";
import { HTTPRequestInterface } from "./interfaces/HTTPRequestInterface";
import { LoggerServiceInterface } from "./interfaces/LoggerServiceInterface";

@injectable()
export class CharacterService implements CharacterServiceInterface {
  private logger: LoggerServiceInterface;
  private httpService: HTTPRequestInterface;

  private urlPath = "/v1/public/characters";
  private apiBaseUrl = process.env.MARVEL_COMICS_API_BASE_URL;
  private apiPrivateKey = process.env.MARVEL_COMICS_API_PRIVATE_KEY;
  private apiPublicKey = process.env.MARVEL_COMICS_API_PUBLIC_KEY;
  private apiKey = process.env.MARVEL_COMICS_API_KEY;

  public constructor(
    @inject(ServiceInterfaceTypes.ServiceTypes.loggerService)
    logger: LoggerServiceInterface,
    @inject(ServiceInterfaceTypes.ServiceTypes.httpRequestService)
    httpService: HTTPRequestInterface
  ) {
    this.logger = logger.getLogger();
    this.httpService = httpService;
  }

  async createAndSave(character: any): Promise<any> {}

  getany(id: string): any[] {
    throw new Error("Method not implemented.");
  }
  getAll(query?: {}): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  create(model: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(updatedModel: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async getPaginated(query?: {}): Promise<any> {
    try {
      const ts = this.httpService.generateRequestId();
      query = {
        apikey: this.apiKey,
        ts,
        hash: md5(`${ts}${this.apiPrivateKey}${this.apiPublicKey}`).toString(),
        ...query,
      };
      const res: any = await this.httpService.getAllAsync(
        `${this.apiBaseUrl}${this.urlPath}`,
        { params: query }
      );

      return res.data;
    } catch (e) {
      console.error(e);
    }
  }

  getByQuery(query: {}): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
}
