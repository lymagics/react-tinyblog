import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function ChangePasswordPage() {
  const [formErrors, setFormErrors] = useState({});
  const oldPasswordField = useRef();
  const passwordField = useRef();
  const password2Field = useRef();
  const navigate = useNavigate();
  const flash = useFlash();
  const api = useApi();

  useEffect(() => {
    oldPasswordField.current.focus();
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (passwordField.current.value !== password2Field.current.value) {
      setFormErrors({ password2: "Passwords don't match" });
    }
    else {
      const response = await api.put('/me/', {
        old_password: oldPasswordField.current.value,
        password: passwordField.current.value,
      });
      if (response.ok) {
        setFormErrors({});
        flash('Your password successfully updated.', 'success');
        navigate('/');
      }
      else {
        setFormErrors(response.body);
      }
    }
  };

  return (
    <Body>
      <h1>Change password</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name='oldPassword' type='password'
          label='Old Password' error={formErrors.old_password}
          fieldRef={oldPasswordField}
        />
        <InputField
          name='password' type='password'
          label='New password' error={formErrors.password}
          fieldRef={passwordField}
        />
        <InputField
          name='password2' type='password'
          label='Password Again' error={formErrors.password2}
          fieldRef={password2Field}
        />
        <Button variant='primary' type='submit'>
          Save
        </Button>
      </Form>
    </Body>
  );
}