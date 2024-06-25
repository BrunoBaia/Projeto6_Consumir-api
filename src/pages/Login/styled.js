import styled from 'styled-components';
import * as colors from '../../config/colors';

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 5px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;

export const RedirectRegister = styled.div`
  margin-top: 5px;
  padding: 10px;
  text-align: right;
`;
