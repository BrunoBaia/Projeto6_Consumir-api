import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import * as actions from './actions';
import * as types from '../types';

const requisicao = (parametroA, parametroB) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

function* exampleRequest() {
  try {
    // se cair no 'resolve()' deu CERTO, logo...
    yield call(requisicao, 'parametroA', 'parametroB');
    toast.success('Sucesso...');
    yield put(actions.clicaBotaoSuccess());
  } catch {
    // se cair no 'reject()' deu ERRADO, logo...
    toast.error('Erro...');
    yield put(actions.clicaBotaoFailure());
  }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
