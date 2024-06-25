import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaExclamationCircle } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { Head1, Head2, ProfileContainer, Data, GalleryContainer, ProfilePicture } from './styled';
import { get } from 'lodash';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading/index';
import * as actions from '../../store/modules/auth/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await axios.get(`/alunos/${id}`);
        const aluno = response.data;

        setIsLoading(false);
        setNome(aluno.nome);
        setSobrenome(aluno.sobrenome);
        setEmail(aluno.email);
        setIdade(aluno.idade);
        setPeso(aluno.peso);
        setAltura(aluno.altura);
        setFotos(aluno.Fotos);

      } catch (err) {
        setIsLoading(false);
        const errors = get(err, 'response.data.errors', []);
        const status = get(err, 'response.status', 0);

        if (errors.length > 0) {
          errors.forEach(error => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }

        if (status === 401) dispatch(actions.loginFailure());
        history.push('/');
      }
    }

    getData();
  }, [id, dispatch]);

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Head1>Profile</Head1>

        <ProfilePicture>
          {get(fotos, '[0].url', '') ? (
            <img src={fotos[0].url} alt={nome} />
            ) : (
              <FaUserCircle size={180} />
            )}
        </ProfilePicture>

      <ProfileContainer>

        <Data>Nome: <span>{nome}</span></Data>
        <Data>Sobrenome: <span>{sobrenome}</span></Data>
        <Data>E-mail: <span>{email}</span></Data>
        <Data>Idade: <span>{idade}</span></Data>
        <Data>Peso (em quilogramas): <span>{peso}</span></Data>
        <Data>Altura (em metros): <span>{altura}</span></Data>

        <Head2>Gallery</Head2>

        <GalleryContainer>
          {fotos.map((foto, index) => (
            <div key={index}>
              {get(foto, 'url', false) ? <img src={foto.url} alt="" /> : <FaExclamationCircle size={136} />}
            </div>
          ))}
        </GalleryContainer>
      </ProfileContainer>

    </Container>
  );
}
