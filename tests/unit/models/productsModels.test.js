const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../../src/app');
const conn = require('../../../src/models/connection');

const productsModel = require('../../../src/models/productsModel');

const { expect, use } = chai;

use(chaiHttp);

const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

describe('Testando o retorno das funções da camada model', () => {
  it('Testa se o retorno da getAll é um array com 3 produtos', async () => {
    sinon.stub(conn, 'execute').resolves([allProductsResponse]);

    const response = await productsModel.getAll();

    expect(response).to.be.equal(allProductsResponse);
  });

  it('Testa se é possivel buscar um produto pelo id com a função getProductsById', async () => {
    sinon.stub(conn, 'execute').resolves([allProductsResponse]);

    const response = await productsModel.getProductsById(1);

    expect(response).to.be.equal(allProductsResponse[0]);
  });

  afterEach(() => sinon.restore());
});
