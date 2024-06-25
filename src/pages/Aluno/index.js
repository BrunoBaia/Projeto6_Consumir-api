import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { AlunoForm, ProfilePicture, Title } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading/index';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Fotos = get(data, 'Fotos[0].url', '');

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade.toString());
        setPeso(data.peso.toString());
        setAltura(data.altura.toString());
        setFoto(Fotos);
        setIsLoading(false);

      } catch (err) {
        const errors = get(err, 'response.data.errors', []);

        setIsLoading(false);

        errors.forEach(error => toast.error(error));
        history.push('/');
      }
    }

    if (id) {
      getData();
    }
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (validate()) return;

    setIsLoading(true);

    try {
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno editado com sucesso');
        setIsLoading(false);
        history.push('/');

      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno criado com sucesso');
        setIsLoading(false);
        history.push(`/aluno/${data.id}/edit`);
      }
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      const status = get(err, 'response.status', 0);

      setIsLoading(false);

      if (errors.length > 0) {
        errors.forEach(error => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  }

  function validate() {
    let formError = false;

    if (nome.length < 3 || nome.length > 255) {
      formError = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formError = true;
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formError = true;
      toast.error('E-mail invalido');
    }

    if (!isInt(idade)) {
      formError = true;
      toast.error('Idade precisa ser um numero inteiro');
    }

    if (!isFloat(peso)) {
      formError = true;
      toast.error('Peso precisa ser um numero valido ( inteiro ou float)');
    }

    if (!isFloat(altura)) {
      formError = true;
      toast.error('Altura precisa ser um numero valido ( inteiro ou float)');
    }

    return formError;
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Editar aluno' : 'Criar novo aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? (
            <img src={foto} alt={nome} />
            ) : (
              <FaUserCircle size={180} />
            )}
            <Link to={`/fotos/${id}`}>
              <FaEdit size={24}/>
            </Link>
        </ProfilePicture>
      )}

      <AlunoForm onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do aluno" />
        </label>
        <label htmlFor="sobrenome">
          Sobrenome:
          <input type="text" value={sobrenome} onChange={e => setSobrenome(e.target.value)} placeholder="Sobrenome do aluno" />
        </label>
        <label htmlFor="email">
          E-mail:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail do aluno" />
        </label>
        <label htmlFor="idade">
          Idade:
          <input type="text" value={idade} onChange={e => setIdade(e.target.value)} placeholder="Idade do aluno" />
        </label>
        <label htmlFor="peso">
          Peso:
          <input type="text" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso do aluno" />
        </label>
        <label htmlFor="altura">
          Altura:
          <input type="text" value={altura} onChange={e => setAltura(e.target.value)} placeholder="Altura do aluno" />
        </label>
        <button type="submit">Salvar</button>
      </AlunoForm>
    </Container>
  );
}
