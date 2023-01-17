const chai = require('chai');
const sinon = require('sinon');

const conn = require('../../../src/models/connection');

const productsModel = require('../../../src/models/productsModel');

const { expect } = chai;

const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

describe('Testes de unidade dos models de produtos', () => {
  it('Testa se é possivel obter uma lista de todos os produtos', async () => {
    sinon.stub(conn, 'execute').resolves([allProductsResponse]);

    const response = await productsModel.getAll();

    expect(response).to.be.equal(allProductsResponse);
  });

  it('Testa se é possivel buscar um produto pelo id', async () => {
    sinon.stub(conn, 'execute').resolves([[allProductsResponse[0]]]);

    const response = await productsModel.getProductsById(1);

    expect(response).to.be.equal(allProductsResponse[0]);
  });

  afterEach(() => sinon.restore());
});
