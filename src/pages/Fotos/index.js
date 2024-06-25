import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import { Title, Form } from './styled';
import Loading from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';


export default function Fotos() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState('');

  React.useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);

      } catch (err) {
        toast.error('Erro ao obter fotos');
        setIsLoading(false);
        history.push('/');
      }
    }

    getData();
  }, [id]);

  const handleChange = async e => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);   // chave e valor que vai receber no backend pelo Multipart(olhar insomnia)
    formData.append('foto', file);

    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',   // necessario para enviar arquivo
        }
      });
      toast.success('Foto enviada com sucesso');
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', '');
      toast.error('Erro ao enviar foto');

      if(status === 401) dispatch(actions.loginFailure());
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : "Selecionar foto"}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
