const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const conn = require('../../../src/models/connection');

const productsServices = require('../../../src/services/productsServices');
const productsModel = require('../../../src/models/productsModel');

const { expect, use } = chai;

use(chaiHttp);

const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

describe('Testes de unidade do services de produtos', () => {
  it('Testa se é possivel obter a lista de todos os produtos', async () => {
    sinon.stub(productsModel, 'getAll').resolves(allProductsResponse);

    const response = await productsServices.getAll();

    expect(response).to.be.equal(allProductsResponse);
  });

  it('Testa se é possivel obter um produto pelo id', async () => {
    sinon
      .stub(productsModel, 'getProductsById')
      .resolves(allProductsResponse[0]);

    const response = await productsModel.getProductsById(1);

    expect(response).to.be.equal(allProductsResponse[0]);
  });

  afterEach(() => sinon.restore());
});
