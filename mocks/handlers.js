import { rest } from 'msw';

import { default as mockCep } from '@/assets/json/cep.json';
import { default as mockProducts } from '@/assets/json/offer-products.json';
import { default as mockUsers } from '@/assets/json/users.json';


export const handlers = [
  rest.get('/offers/:offer_code', (req, res, ctx) => {
    const { offer_code } = req.params
    const products = mockProducts.filter( item => 
      item.id === offer_code
    )

    if(offer_code === 'undefined') {
      return res(
        ctx.status(400)
      )
    }
    
    return res(
      ctx.status(200),
      ctx.json(products)
    )
  }),

  rest.post('/offers/:offer_code/create_order', (req, res, ctx) => {
    const { offer_code } = req.params

    console.error('req', req);
    const products = mockProducts.filter( item => 
      item.id === offer_code
    )

    if(offer_code === 'undefined') {
      return res(
        ctx.status(400)
      )
    }
    
    return res(
      ctx.status(200),
      ctx.json(products)
    )
  }),

  rest.get('/cep/:number', (req, res, ctx) => {
    const { number } = req.params
    const address = mockCep.filter( item => 
      item.cep === number
    )

    if(number === 'undefined') {
      return res(
        ctx.status(400)
      )
    }
    
    return res(
      ctx.status(200),
      ctx.json(address)
    )
  }),

  rest.get("/users", (_, res, context) => {
    return res(
      context.status(200),
      context.json(mockUsers)
    );
  })
  
];
