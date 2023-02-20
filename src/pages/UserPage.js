import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import Posts from '../components/Posts';
import TimeAgo from '../components/TimeAgo';
import { useApi } from '../contexts/ApiProvider';
import { useUser } from '../contexts/UserProvider';

export default function UserPage() {
  const [user, setUser] = useState();
  const { username } = useParams();
  const { user: currentUser } = useUser();
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    (async () => {
      const response = await api.get('/users/' + username + '/');
      setUser(response.ok ? response.body : null);
    })();
  }, [username, api]);

  const edit = () => {
    navigate('/edit');
  };

  return (
    <Body>
      {user === undefined ?
        <Spinner animation='border' />
        :
        <>
          {user === null ?
            <p>User not found.</p>
            :
            <>
              <Stack direction='horizontal'>
                <Image src={user.avatar_url + '&s=128'} roundedCircle />
                <div className='Content'>
                  <h1>{user.username}</h1>
                  {user.about_me && <p>{user.about_me}</p>}
                  First seen: <TimeAgo isoDate={user.first_seen} /> <br />
                  Last seen: <TimeAgo isoDate={user.last_seen} /> <br />
                  {user.id === currentUser.id && <Button onClick={edit}>Edit</Button>}
                </div>
              </Stack>
              <Posts content={user.username} />
            </>
          }
        </>
      }
    </Body>
  );
}