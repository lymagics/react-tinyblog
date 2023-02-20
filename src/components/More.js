import Button from 'react-bootstrap/Button';

export default function More({ loadNextPage }) {
  return (
    <div className='More'>
      <Button variant='outline-primary' onClick={loadNextPage}>
        More
      </Button>
    </div>
  );
}