import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Alunos from '../pages/Alunos/index';
import Aluno from '../pages/Aluno/index';
import Fotos from '../pages/Fotos/index';
import Login from '../pages/Login/index';
import Register from '../pages/Register/index';
import Page404 from '../pages/Page404/index';
import Profile from '../pages/Profile/index';

export default function Routes() {
  return (
      <Switch>
        <MyRoute exact path='/' component={Alunos} isClosed={false}/>
        <MyRoute exact path='/aluno/' component={Aluno} isClosed/>
        <MyRoute exact path='/aluno/:id/edit' component={Aluno} isClosed/>
        <MyRoute exact path='/fotos/:id' component={Fotos} isClosed/>
        <MyRoute exact path='/login/' component={Login} isClosed={false}/>
        <MyRoute exact path='/register/' component={Register} isClosed={false}/>
        <MyRoute exact path='/profile/:id' component={Profile} isClosed/>
        <MyRoute path='*' component={Page404} />
      </Switch>
  );
}
