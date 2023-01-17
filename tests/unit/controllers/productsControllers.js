const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const conn = require('../../../src/models/connection');

const app = require('../../../src/app');
const productsController = require('../../../src/controllers/productsController');

const { expect, use } = chai;

use(chaiHttp);

const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

describe('Testes de unidade dos controllers de produtos', () => {
  it('Testa se a requisição retorna o status 200 e objeto com sucesso', async () => {
    sinon.stub(conn, 'execute').resolves([allProductsResponse]);

    const response = await chai.request(app).get('/products');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allProductsResponse);
  });

  it('Testa se retorna o status 404 e a mensagem de produto não encontrado', async () => {
    sinon.stub(conn, 'execute').resolves([[undefined]]);

    const response = await chai.request(app).get('/products/999');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal({ message: 'Product not found' });
  });

  it('Testa se a requisição retorna o status 200 e o produto buscado pelo id', async () => {
    sinon.stub(conn, 'execute').resolves([[allProductsResponse[0]]]);

    const response = await chai.request(app).get('/products/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allProductsResponse[0]);
  });

  afterEach(() => sinon.restore());
});
