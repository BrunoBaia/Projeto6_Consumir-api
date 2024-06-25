import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaCircle, FaPowerOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Nav } from './styled';
import * as Actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  function handleLogout(e) {
    e.preventDefault();

    toast.success('Voce foi desconectado');
    dispatch(Actions.loginFailure());
    history.push('/');
  }

  return (
    <Nav>
      <Link to='/'>
        <FaHome  size={24} />
      </Link>
      <Link to='/register'>
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
      <Link to='/logout' onClick={handleLogout}>
        <FaPowerOff size={24} />
      </Link>
      ) : (
      <Link to='/login'>
        <FaSignInAlt size={24} />
      </Link>
      )}

      <FaCircle size={24} color={isLoggedIn ? "lightgreen" : "red"} />
    </Nav>
  );
}
