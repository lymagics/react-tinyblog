import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useUser } from '../contexts/UserProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function EditUserPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const aboutMeField = useRef();
  const navigate = useNavigate();
  const api = useApi();
  const flash = useFlash();
  const { user, setUser } = useUser();

  useEffect(() => {
    usernameField.current.value = user.username;
    aboutMeField.current.value = user.about_me;
    usernameField.current.focus();
  }, [user]);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const response = await api.put('/me/', {
      username: usernameField.current.value,
      about_me: aboutMeField.current.value,
    });
    if (response.ok) {
      setFormErrors({});
      setUser(response.body);
      flash('Account information has been updated.', 'success');
      navigate('/user/' + response.body.username);
    }
    else {
      setFormErrors(response.body);
    }
  };

  return (
    <Body>
      <h1>Edit</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name='username' label='Username'
          error={formErrors.username} fieldRef={usernameField}
        />
        <InputField
          name='aboutMe' label='About Me'
          error={formErrors.about_me} fieldRef={aboutMeField}
        />
        <Button variant='primary' type='submit'>
          Save
        </Button>
      </Form>
    </Body>
  );
}