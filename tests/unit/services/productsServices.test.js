const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const productsServices = require('../../../src/services/productsServices');
const productsModel = require('../../../src/models/productsModel');

const { expect, use } = chai;

use(chaiHttp);

const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

describe('Testes de unidade dos services de produtos', () => {
  it('Testa se é possivel obter a lista de todos os produtos', async () => {
    sinon.stub(productsModel, 'getAll').resolves(allProductsResponse);

    const response = await productsServices.getAll();

    expect(response).to.be.equal(allProductsResponse);
  });

  it('Testa se é possivel obter um produto pelo id', async () => {
    sinon
      .stub(productsModel, 'getProductsById')
      .resolves(allProductsResponse[0]);

    const response = await productsServices.getProductsById(1);

    expect(response).to.be.equal(allProductsResponse[0]);
  });

  it('Testa se retorna um erro caso o ID seja inválido', async () => {
    sinon.stub(productsModel, 'getProductsById').resolves(undefined);
    try {
      await productsServices.getProductsById(999);
    } catch (error) {
      expect(error.message).to.be.equal('Product not found');
    }
  });

  afterEach(() => sinon.restore());
});
