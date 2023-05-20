const chai = require('chai');
const sinon = require('sinon');

const conn = require('../../../src/models/connection');

const salesModel = require('../../../src/models/salesModel');

const { expect } = chai;

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


describe("Testes de unidade dos models de sales", () => {
  it("Testa se é possivel obter uma lista de todos as sales", async () => {
    sinon.stub(conn, "execute").resolves([allSalesResponse]);

    const response = await salesModel.getAllSales();
    expect(response).to.be.deep.equal(allSalesResponse);
  });

  it("Testa se é possivel buscar uma sale pelo id", async () => {
    sinon.stub(conn, "execute").resolves([[allSalesResponse[0]]]);

    const response = await salesModel.getSaleById(1);

    expect(response).to.be.deep.equal([allSalesResponse[0]]);
  });

  afterEach(() => sinon.restore());
});
