import React, { FC } from "react";
import styled from "styled-components";
import { PostType } from "components/Posts/posts-api";

export const Post: FC<{ post: PostType }> = ({ post }) => {
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
    @media (max-width: 480px) {
      padding: 15px 6px;
    }
  }
`;

export const IdColumn = styled.div`
  flex: 0 1 10%;
  border-left: 1px solid var(--gray-color);
`;

export const TitleColumn = styled.div`
  flex: 0 1 50%;
  border: 1px solid var(--gray-color);
  border-top: none;
  border-bottom: none;
  @media (max-width: 768px) {
    flex: 0 1 40%;
  }
`;

export const DescriptionColumn = styled.div`
  flex: 0 1 40%;
  border-right: 1px solid var(--gray-color);
  @media (max-width: 768px) {
    flex: 0 1 50%;
  }
`;
