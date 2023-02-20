import { useState, useEffect, useRef } from 'react';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputField from './InputField';
import { useApi } from '../contexts/ApiProvider';
import { useUser } from '../contexts/UserProvider';

export default function Write({ showPost }) {
  const [formErrors, setFormErrors] = useState({});
  const textField = useRef();
  const { user } = useUser();
  const api = useApi();

  useEffect(() => {
    textField.current.focus();
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const response = await api.post('/posts/', {
      text: textField.current.value,
    });
    if (!response.ok) {
      setFormErrors(response.body);
    }
    else {
      setFormErrors({});
      textField.current.value = '';
      showPost(response.body);
    }
  };

  return (
    <Stack direction='horizontal'>
      <Image
        src={user.avatar_url + '&s=40'}
        roundedCircle
      />
      <div className='Write'>
        <Form onSubmit={onSubmit}>
          <InputField
            name='text' placeholder="What's on your mind?"
            error={formErrors.text} fieldRef={textField}
          />
        </Form>
      </div>
    </Stack>
  );
}