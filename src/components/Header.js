import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

export default function Header() {
  const { user, logout } = useUser();

  return (
    <Navbar bg='light' sticky='top' className='Header'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          Tinyblog
        </Navbar.Brand>
        {user === undefined ?
          <Spinner animation='border' />
          :
          <div className='justify-content-end'>
            {user === null ?
              <Nav.Link as={NavLink} to='/login'>Login</Nav.Link>
              :
              <>
                <NavDropdown
                  title={<Image src={user.avatar_url + '&s=32'} roundedCircle />}
                  align='end'
                >
                  <NavDropdown.Item as={NavLink} to={'/user/' + user.username}>
                    {user.username}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to='/password'>
                    Change password
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            }
          </div>
        }
      </Container>
    </Navbar>
  );
}