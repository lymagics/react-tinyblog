import Container from 'react-bootstrap/Container';
import FlashMessage from './FlashMessage';

export default function Body({ children }) {
  return (
    <Container className='Body'>
      <FlashMessage />
      {children}
    </Container>
  );
}