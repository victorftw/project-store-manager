const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

const conn = require("../../../src/models/connection");

const app = require("../../../src/app");

const { expect, use } = chai;

use(chaiHttp);

const allSalesResponse = [
  {
    saleId: 1,
    date: "2023-05-20T12:42:17.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-05-20T12:42:17.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-05-20T12:42:17.000Z",
    productId: 3,
    quantity: 15,
  },
];

describe("Testes de unidade dos controllers de sales", () => {
  it("Testa se a requisição retorna o status 200 e objeto com sucesso", async () => {
    sinon.stub(conn, "execute").resolves([allSalesResponse]);

    const response = await chai.request(app).get("/sales");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allSalesResponse);
  });

  it("Testa se retorna o status 404 e a mensagem de sale não encontrado", async () => {
    sinon.stub(conn, "execute").resolves([undefined]);

    const response = await chai.request(app).get("/sales/999");
    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal({ message: "Sale not found" });
  });

  it("Testa se a requisição retorna o status 200 e a sale buscado pelo id", async () => {
    sinon.stub(conn, "execute").resolves([allSalesResponse[0]]);

    const response = await chai.request(app).get("/sales/1");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allSalesResponse[0]);
  });

  afterEach(() => sinon.restore());
});
