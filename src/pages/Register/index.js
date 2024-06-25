import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { RegisterForm, Redirect } from './styled.js';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/index';
import * as actions from '../../store/modules/auth/actions.js';

export default function Register() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  React.useEffect(() => {
    if (!user.id) return;

    setNome(user.nome);
    setEmail(user.email);
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (validate()) return;

    dispatch(actions.registerRequest({ id: user.id, nome, email, password, passwordConfirm }));
  }

  async function handleDelete(event) {
    /* eslint-disable-next-line no-restricted-globals */
    const response = confirm('Tem certeza que deseja deletar esta conta?');

    if (response) dispatch(actions.deleteRequest({ id: user.id }));
  }

  function validate() {
    let formError = false;

    if (nome.length < 3 || nome.length > 255) {
      formError = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formError = true;
      toast.error('E-mail invalido');
    }

    if ((!user.id) && (password.length < 6 || password.length > 50)) {
      formError = true;
      toast.error('Senha precisa ter entre 6 e 50 caracteres');
    }

    if (password !== passwordConfirm) {
      formError = true;
      toast.error('Confirmacao de senha falhou');
    }

    return formError;
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{user.id ? 'Editar dados' : 'Crie sua conta'}</h1>

      <RegisterForm onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" />
        </label>
        <label htmlFor="email">
          E-mail:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" />
        </label>
        <label htmlFor="password">
          Senha:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" />
        </label>
        <label htmlFor="passwordConfirm">
          Confirma Senha:
          <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="Confirma senha" />
        </label>
        <button type="submit">Salvar</button>
      </RegisterForm>
      <Redirect>
        {user.id ? (
          <button onClick={handleDelete}>Deletar conta</button>
        ) : (
          <>
            Ja possui conta? <Link to='/login'>Faca login</Link>
          </>
        )}
      </Redirect>
    </Container>
  );
}
