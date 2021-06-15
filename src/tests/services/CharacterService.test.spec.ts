import "mocha";
import { assert, expect } from "chai";
import { deepEqual, instance, mock, verify, when } from "ts-mockito";

import { CharacterServiceInterface } from "../../services";

const characterIds = [1011334, 1017100, 1009144, 1010699];
const characterDetails = [
  {
    id: "1009146",
    name: "Abomination (Emil Blonsky)",
    description: "A Description",
  },
  {
    id: "1017100",
    name: "A-Bomb (HAS)",
    description: "Another Description",
  },
];

describe("CharacterService Test", () => {
  let mockedCharacterService: CharacterServiceInterface;
  let characterService: CharacterServiceInterface;

  beforeEach(() => {
    mockedCharacterService = mock<CharacterServiceInterface>();
    characterService = instance(mockedCharacterService);
  });

  describe("get All Images", () => {
    it("should return an array", async () => {
      callGetAll();

      const res = await characterService.getAll();

      expect(res).not.to.be.null;
      expect(res).to.be.an("array");
      expect(res.length).to.be.greaterThan(1);
    });
  });

  describe("find character by Id", () => {
    it("should return a character", async () => {
      const characterId = "1017100";
      callGet(characterId);

      const res = await characterService.getById(characterId);

      expect(res).not.to.be.null;
      expect(res.id).to.be.eql(characterId);
      expect(res).not.to.be.an("array");
    });
  });

  function callGetAll() {
    when(mockedCharacterService.getAll()).thenResolve(characterIds);
  }

  function callGet(id: string) {
    when(mockedCharacterService.getById(id)).thenResolve(
      characterDetails.find((o) => o.id === id)
    );
  }
});
