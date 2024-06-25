import styled from 'styled-components';

export const Head1 = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

export const Head2 = styled.h2`
  text-align: center;
  margin-top: 40px;
  margin-bottom: 30px;
`;

export const ProfileContainer = styled.div``;

export const Data = styled.div`
  padding: 15px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GalleryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  img {
    width: 136px;
    height: 136px;
    border-radius: 50%;
  }
`;

export const ProfilePicture = styled.div`
  text-align: center;
  padding: 0 0 20px;
  margin: 20px 0;

  img {
    height: 180px;
    width: 180px;
    border-radius: 50%;
  }
`;
