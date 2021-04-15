import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps { //para passar as props pro header
  onOpenTransactionModal: () => void; //funcao com retorno vazio
}

//passando a propiedade para o props, e para o onclick
export function Header({ onOpenTransactionModal }: HeaderProps) {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" title="dt money" />
        <button type="button" onClick={onOpenTransactionModal}>
          Nova transação
        </button>

      </Content>
    </Container>
  );
}