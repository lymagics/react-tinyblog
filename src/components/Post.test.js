import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Post from './Post';

test('renders post', () => {
  const timestampUTC = '2022-01-01T00:00:00.000000Z';
  const Test = () => {
    const post = {
      text: 'hello',
      timestamp: timestampUTC,
      author: {
        username: 'bob',
        avatar_url: 'http://avatar.com/bob',
      },
    };

    return (
      <BrowserRouter>
        <Post post={post} />
      </BrowserRouter>
    );
  };

  render(<Test />);

  const message = screen.getByText('hello');
  const authorLink = screen.getByText('bob');
  const avatar = screen.getByAltText('bob');
  const timestamp = screen.getByText(/last year/);

  expect(message).toBeInTheDocument();
  expect(authorLink).toBeInTheDocument();
  expect(authorLink).toHaveAttribute('href', '/user/bob');
  expect(avatar).toBeInTheDocument();
  expect(avatar).toHaveAttribute('src', 'http://avatar.com/bob&s=48')
  expect(timestamp).toBeInTheDocument();
  expect(timestamp).toHaveAttribute(
    'title', new Date(Date.parse(timestampUTC)).toString()
  );
});