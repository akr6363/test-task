import styled from "styled-components";
import React from "react";
import { postsActions, SortKeyType, SortParamsType } from "../posts-reducer";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { SortableColumn } from "components/Posts/PostsTable/SortableColumn";
import { TableBody } from "components/Posts/PostsTable/TableBody";

export const PostsTable = () => {
  const dispatch = useAppDispatch();
  const sortParams = useAppSelector((state) => state.posts.sortParams);
  const tableHeaders = [
    { title: "ID", sortKey: "id" as SortKeyType },
    { title: "Заголовок", sortKey: "title" as SortKeyType },
    { title: "Описание", sortKey: "body" as SortKeyType },
  ];

  const onSort = (sortKey: SortKeyType, sortParams: SortParamsType) => {
    let params: SortParamsType = {
      sortKey: sortKey,
      sortDirection: "asc",
    };
    if (sortKey === sortParams.sortKey && sortParams.sortDirection === "asc") {
      params.sortDirection = "desc";
    }
    dispatch(postsActions.setSortParams({ params }));
  };

  return (
    <TableContainer>
      <TableHeader>
        {tableHeaders.map(({ title, sortKey }) => (
          <SortableColumn key={sortKey} title={title} sortKey={sortKey} sortParams={sortParams} onSort={onSort} />
        ))}
      </TableHeader>
      <Routes>
        <Route path={"/"} element={<TableBody />}>
          <Route path={":id"} element={<TableBody />} />
        </Route>
      </Routes>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  margin-bottom: 16px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
`;
const TableHeader = styled.div`
  display: flex;
  background-color: var(--main-color);
  color: #fff;
  font-size: 14px;
  font-weight: var(--font-weight-bold);
`;
