import React from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { LoginForm, RedirectRegister } from './styled';
import * as actions from '../../store/modules/auth/actions';
import { Link } from 'react-router-dom';

import Loading from '../../components/Loading/index';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector(state => state.auth.isLoading);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  function validate() {
    let formError = false;

    if (!isEmail(email)) {
      formError = true;
      toast.error('E-mail invalido');
    }

    if (password.length < 6 || password.length > 50) {
      formError = true;
      toast.error('Senha invalido');
    }

    return formError;
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <LoginForm onSubmit={handleSubmit}>
        <label htmlFor="email">
          E-mail:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" />
        </label>
        <label htmlFor="password">
          Senha:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" />
        </label>
        <button type='submit'>Entrar</button>
      </LoginForm>
      <RedirectRegister>
        Nao possui conta? <Link to='/Register'>Registre-se</Link>
      </RedirectRegister>
    </Container>
  );
}
