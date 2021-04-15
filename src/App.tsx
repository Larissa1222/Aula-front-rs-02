import { TransactionsProvider } from './hooks/useTransactions';
import { useState } from 'react';
import Modal from 'react-modal';

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { TransactionModal } from './components/TransactionModal';

import { GlobalStyle } from "./styles/global";

Modal.setAppElement('#root');

export function App() {

  //nao pode jogar as funcoes e useState pro componente pois seria
  //complicado para compartilhar informacoes com o botao do Header
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  function handleOpenTransactionModal() {
    setIsTransactionModalOpen(true);
  }
  function handleCloseTransactionModal() {
    setIsTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenTransactionModal={handleOpenTransactionModal} />
      <Dashboard />

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onRequestClose={handleCloseTransactionModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}


