import React, {FC} from 'react';
import {PostType} from "../posts-api";
import styled from "styled-components";

export const Post: FC<{post: PostType}> = ({post}) => {
    return (
        <TableRow>
            <IdColumn>{post.id}</IdColumn>
            <TitleColumn>{post.title}</TitleColumn>
            <DescriptionColumn>{post.body}</DescriptionColumn>
        </TableRow>
    );
};

const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid var(--gray-color);
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 11px;
  }
`

export const IdColumn = styled.div `
  flex: 0 1 10%;
  border-left: 1px solid var(--gray-color);
`

export const TitleColumn = styled.div `
  flex: 0 1 50%;
  border: 1px solid var(--gray-color);
  border-top: none;
  border-bottom: none;
`

export const DescriptionColumn = styled.div `
  flex: 0 1 40%;
  border-right: 1px solid var(--gray-color);
`

