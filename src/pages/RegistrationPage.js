import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';

export default function RegistrationPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const emailField = useRef();
  const passwordField = useRef();
  const password2Field = useRef();
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    usernameField.current.focus();
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (passwordField.current.value !== password2Field.current.value) {
      setFormErrors({ password2: "Passwords don't match." });
    }
    else {
      const response = await api.post('/users/', {
        username: usernameField.current.value,
        email: emailField.current.value,
        password: passwordField.current.value
      });
      if (!response.ok) {
        setFormErrors(response.body);
      }
      else {
        setFormErrors({});
        navigate('/login');
      }
    }
  };

  return (
    <Body>
      <h1>Sign Up</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name='username' label='Username'
          error={formErrors.username} fieldRef={usernameField}
        />
        <InputField
          name='email' label='Email Address'
          error={formErrors.email} fieldRef={emailField}
        />
        <InputField
          name='password' type='password'
          label='Password' error={formErrors.password}
          fieldRef={passwordField}
        />
        <InputField
          name='password2' type='password'
          label='Password Again' error={formErrors.password2}
          fieldRef={password2Field}
        />
        <Button variant='primary' type='submit'>
          Sign Up
        </Button>
      </Form>
    </Body>
  );
}