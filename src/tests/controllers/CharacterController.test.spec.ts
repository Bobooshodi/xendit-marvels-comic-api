import "reflect-metadata";
import "mocha";
import chaiHttp from "chai-http";
import { request, use, expect } from "chai";

use(chaiHttp);

describe("CharacterController Test", () => {
  /*
   * Test the /GET characters route
   */
  describe("/GET characters", () => {
    it("it should GET all the character IDs", (done) => {
      request("localhost:8080")
        .get("/characters")
        .end((err, res: any) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("array");
          expect(res.body).length.to.be.greaterThan(0);
          done();
        });
    });
  });

  /*
   * Test the /GET character/{id} route
   */
  describe("/GET characters/{id}", () => {
    const characterId = 1017100;
    it("it should GET the a Character's ID, Name and Description", (done) => {
      request("localhost:8080")
        .get("/characters/" + characterId)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.not.be.a("array");
          expect(res.body).to.be.an("Object");
          expect(res.body.id).to.equal(characterId);
          expect(Object.keys(res.body).length).to.equal(3);
          done();
        });
    });
  });

  /*
   * Test the /GET character/{id} route
   */
  describe("/GET characters/{id}", () => {
    it("it should throw an error not found", (done) => {
      request("localhost:8080")
        .get("/characters/1")
        .end((err, res) => {
          console.log(res.status);

          expect(res).to.not.have.status(200);
          done();
        });
    });
  });
});
