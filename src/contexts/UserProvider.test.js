import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import FlashProvider from './FlashProvider';
import ApiProvider from './ApiProvider';
import UserProvider from './UserProvider';
import { useUser } from './UserProvider';

const realFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch = realFetch;
  localStorage.clear();
});

test('logs user in', async () => {
  const urls = [];

  global.fetch
    .mockImplementationOnce(url => {
      urls.push(url);
      return {
        ok: true,
        status: 201,
        json: () => Promise.resolve({ access_token: '123', refresh_token: '456' }),
      };
    })
    .mockImplementationOnce(url => {
      urls.push(url);
      return {
        ok: true,
        status: 200,
        json: () => Promise.resolve({ username: 'bob' }),
      };
    });

  const Test = () => {
    const { login, user } = useUser();
    useEffect(() => {
      (async () => {
        await login('username', 'password');
      })();
    }, [login]);
    return user ? <p>{user.username}</p> : null;
  }

  render(
    <FlashProvider>
      <ApiProvider>
        <UserProvider>
          <Test />
        </UserProvider>
      </ApiProvider>
    </FlashProvider>
  );

  const element = await screen.findByText('bob');
  expect(element).toBeInTheDocument();
  expect(global.fetch).toBeCalledTimes(2);
  expect(urls).toHaveLength(2);
  expect(urls[0]).toMatch(/^http.*\/api\/tokens\/$/);
  expect(urls[1]).toMatch(/^http.*\/api\/me\/$/);
});

test('logs user out', async () => {
  global.fetch
    .mockImplementationOnce(() => {
      return {
        ok: true,
        status: 200,
        json: () => Promise.resolve({ username: 'bob' }),
      };
    });

  localStorage.setItem('accessToken', '123');
  localStorage.setItem('refreshToken', '456');

  const Test = () => {
    const { logout, user } = useUser();
    if (user) {
      return (
        <>
          <p>{user.username}</p>
          <button onClick={logout}>log out</button>
        </>
      );
    }
    else if (user === null) {
      return <p>logged out</p>;
    }
    else {
      return null;
    }
  };

  render(
    <FlashProvider>
      <ApiProvider>
        <UserProvider>
          <Test />
        </UserProvider>
      </ApiProvider>
    </FlashProvider>
  );

  const element = await screen.findByText('bob');
  const button = await screen.findByRole('button');
  expect(element).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  userEvent.click(button);
  const element2 = await screen.findByText('logged out');
  expect(element2).toBeInTheDocument();
  expect(localStorage.getItem('accessToken')).toBeNull();
  expect(localStorage.getItem('refreshToken')).toBeNull();
});