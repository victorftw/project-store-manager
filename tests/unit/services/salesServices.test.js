const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

const salesServices = require("../../../src/services/salesServices");
const salesModel = require("../../../src/models/salesModel");

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

describe("Testes de unidade dos services de sales", () => {
  it("Testa se é possivel obter a lista de todos as sales", async () => {
    sinon.stub(salesModel, "getAllSales").resolves(allSalesResponse);

    const response = await salesServices.getAllSales();

    expect(response).to.be.equal(allSalesResponse);
  });

  it("Testa se é possivel obter uma sale pelo id", async () => {
    sinon
      .stub(salesModel, "getSaleById")
      .resolves(allSalesResponse[0]);

    const response = await salesServices.getSaleById(1);

    expect(response).to.be.equal(allSalesResponse[0]);
  });

  it("Testa se retorna um erro caso o ID seja inválido", async () => {
    sinon.stub(salesModel, "getSaleById").resolves(undefined);
    try {
      await salesModel.getSaleById(999);
    } catch (error) {
      expect(error.message).to.be.equal("Sale not found");
    }
  });

  afterEach(() => sinon.restore());
});
