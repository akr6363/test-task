import { useAppSelector } from "common/hooks/useAppSelector";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import React, { useEffect } from "react";
import { Post } from "components/Posts/PostsTable/Post/Post";
import styled from "styled-components";
import { Preloader } from "components/Preloader";
import { postsActions, postsThunks } from "components/Posts/posts-reducer";

export const TableBody = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  const status = useAppSelector((state) => state.posts.status);
  const currentPage = useAppSelector((state) => state.posts.currentPage);
  const sortParams = useAppSelector((state) => state.posts.sortParams);
  const searchValue = useAppSelector((state) => state.posts.searchValue);

  const navigate = useNavigate();
  if (window.location.pathname === "/") {
    navigate("/1");
  }

  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(postsActions.setCurrentPage({ currentPage: Number(id) }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(postsThunks.fetchPosts());
  }, [sortParams, searchValue, currentPage, dispatch]);

  if (status === "loading")
    return (
      <EmptyPage>
        <Preloader />
      </EmptyPage>
    );

  return posts.length ? (
    <>
      {posts.map((p) => {
        return <Post post={p} key={p.id} />;
      })}
    </>
  ) : (
    <EmptyPage>Посты не найдены...</EmptyPage>
  );
};

const EmptyPage = styled.div`
  font-size: 20px;
  color: var(--gray-color);
  display: flex;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
`;
