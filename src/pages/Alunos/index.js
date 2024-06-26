import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Alunoh1, AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/index';
import * as actions from '../../store/modules/auth/actions';

export default function Alunos() {
  const dispatch = useDispatch();
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  function handleDeleteAsk(e) {
    e.preventDefault();

    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  }

  async function handleDelete(e, id) {
    try {
      setIsLoading(true);

      const request = await axios.delete(`/alunos/${id}`);
      const response = get(request, 'data.result', []);

      setAlunos(alunos.filter(aluno => aluno.id !== id));
      setIsLoading(false);

      response.map(message => toast.success(message));
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      const status = get(err, 'response.status', 0);

      setIsLoading(false);

      errors.map(error => toast.error(error));
      if (status === 401) {
        dispatch(actions.loginFailure());
        history.push('/login');
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Alunoh1>Alunos</Alunoh1>

      <NovoAluno to="/aluno">Adicionar novo aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map(aluno => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? <img src={aluno.Fotos[0].url} alt="" /> : <FaUserCircle size={36} />}
            </ProfilePicture>

            <Link to={`/profile/${aluno.id}`}>{aluno.nome}</Link>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link to={`/aluno/${aluno.id}/delete`} onClick={handleDeleteAsk}>
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation size={16} display="none" cursor="pointer" onClick={(e) => handleDelete(e, aluno.id)} />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
