import {useAppSelector} from "../../../common/hooks/useAppSelector";
import Post from "../Post/Post";
import styled from "styled-components";
import React from "react";

export const PostsTable = () => {
    const posts = useAppSelector(state => state.posts.posts)

    const postsItems = <>
        {posts.map(p => {
            return (
                <Post post={p} key={p.id}/>
            )
        })}
    </>

    return (
        <TableContainer>
            <TableHeader>
                <div className={'id'}>ID</div>
                <div className={'title'}>Заголовок</div>
                <div className={'description'}>Описание</div>
            </TableHeader>
            {posts.length
                ? postsItems
                : <EmptyPage>Посты не найдены...</EmptyPage>
            }
        </TableContainer>
    )
}

const TableContainer = styled.div`
  margin-bottom: 16px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
`
const TableHeader = styled.div`
  display: flex;
  background-color: var(--main-color);
  color: #FFF;
  font-size: 14px;
  font-weight: 600;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 19px 11px;
  }
`

const EmptyPage = styled.div`
  font-size: 20px;
  color: var(--gray-color);
  display: flex;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
`