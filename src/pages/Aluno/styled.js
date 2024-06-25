import styled from 'styled-components';
import * as colors from '../../config/colors';

export const AlunoForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
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

export const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;

  img {
    height: 180px;
    width: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content:  center;
    border: none;
    position: absolute;
    bottom: 0;
    color: white;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;
