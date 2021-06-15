import { AbstractInterface } from "./common/AbstractInterface";

export interface CharacterServiceInterface extends AbstractInterface<any> {
  createAndSave(character: any): Promise<any>;
}
