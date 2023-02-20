import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useUser } from '../contexts/UserProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const passwordField = useRef();
  const navigate = useNavigate();
  const { login } = useUser();
  const flash = useFlash();

  useEffect(() => {
    usernameField.current.focus();
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const result = await login(usernameField.current.value, passwordField.current.value);
    if (result === 'ok') {
      setFormErrors({});
      navigate('/');
    }
    else {
      flash('Invalid username or password.', 'danger');
    }

  };

  return (
    <Body>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name='username' label='Username'
          error={formErrors.username} fieldRef={usernameField}
        />
        <InputField
          name='password' type='password'
          label='Password' error={formErrors.password}
          fieldRef={passwordField}
        />
        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
      <p>Don&apos;t have an account? Click <Link to='/register'>here</Link> to register.</p>
    </Body>
  );
}