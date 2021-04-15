import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}
//type pra nao criar outra interface, omitindo os campos id e created
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

//interface com children pois o react nao aceitava o TransactionProvider
//como um componente
interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  //valor inicial nao era aceito, entao foi forcado a tipagem
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transaction')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  //async que comunica com o modal (await) p criar transacao
  //necessário tipar oq irá receber porem, no modal usa 
  //createdAt nem o id, então necessário omitir
  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transaction', {
      ...transactionInput,
      createdAt: new Date(),
    })
    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction,
    ]);
  }
  //no return, foi preciso colocar a função create tbm
  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )

}
//transformando em hook p/ n precisar importar useContext nos 
//componentes
export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}