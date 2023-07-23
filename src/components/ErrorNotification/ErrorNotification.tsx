import { useEffect, useState } from "react";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postsActions } from "components/Posts/posts-reducer";

export const ErrorNotification = () => {
  const error = useAppSelector((state) => state.posts.error);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timerId = setTimeout(() => {
        dispatch(postsActions.setError({ error: null }));
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [error, dispatch]);

  const handleClose = () => {
    dispatch(postsActions.setError({ error: null }));
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <ErrorContainer>
      <div>{error}</div>
      <CloseBtn onClick={handleClose}>X</CloseBtn>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 90vh;
  z-index: 100;
  background-color: red;
  display: flex;
  padding: 10px 20px;
  div {
    color: #fff;
    font-weight: 600;
  }
`;

const CloseBtn = styled.div`
  padding-left: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: var(--gray-color);
    transition: color 0.3s ease-in-out;
  }
`;
