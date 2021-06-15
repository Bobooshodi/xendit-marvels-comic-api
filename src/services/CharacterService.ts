import { inject, injectable } from "inversify";
import md5 from "crypto-js/md5";
import { get, map, pick } from "lodash";

import { ServiceInterfaceTypes } from "../service-container/ServiceTypes";

import { CharacterServiceInterface } from "./interfaces/CharacterServiceInterface";
import { HTTPRequestInterface } from "./interfaces/HTTPRequestInterface";
import { LoggerServiceInterface } from "./interfaces/LoggerServiceInterface";

@injectable()
export class CharacterService implements CharacterServiceInterface {
  private logger: any;
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
  async getAll(query?: {}): Promise<any[]> {
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

      const characters = get(res.data, "data.results");

      return map(characters, (character: any) => character.id);
    } catch (e) {
      this.logger.error(e);

      throw new Error(e.response.data.status);
    }
  }
  async getById(id: string): Promise<any> {
    try {
      const ts = this.httpService.generateRequestId();
      const query = {
        apikey: this.apiKey,
        ts,
        hash: md5(`${ts}${this.apiPrivateKey}${this.apiPublicKey}`).toString(),
      };
      const res: any = await this.httpService.getAsync(
        `${this.apiBaseUrl}${this.urlPath}/${id}`,
        { params: query }
      );

      const character = get(res.data, "data.results")[0]; // safe since Error if not found
      return pick(character, ["id", "name", "description"]);
    } catch (e) {
      this.logger.error(e.response.data);

      throw new Error(e.response.data.status);
    }
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
}
