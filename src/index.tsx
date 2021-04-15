import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance App',
          type: 'deposit',
          category: 'Dev',
          amount: 5280,
          createdAt: new Date('2020-12-28'),
        },
        {
          id: 2,
          title: 'Roupas',
          type: 'withdraw',
          category: 'Clothes',
          amount: 320,
          createdAt: new Date('2021-01-08'),
        },
        {
          id: 3,
          title: 'Investimentos renda variável',
          type: 'deposit',
          category: 'Investments',
          amount: 653,
          createdAt: new Date('2021-01-12'),
        },
        {
          id: 4,
          title: 'Aluguel e contas',
          type: 'withdraw',
          category: 'Rent',
          amount: 972,
          createdAt: new Date('2021-01-18'),
        },
        
      ]
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transaction', () => {
      return this.schema.all('transaction')
    });
    this.post('/transaction', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

