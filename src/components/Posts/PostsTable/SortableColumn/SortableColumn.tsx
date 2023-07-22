import React, { FC } from "react";
import cn from "classnames";
import styled from "styled-components";
import { ReactComponent as IconArrow } from "assets/img/arrow-sort.svg";
import { SortKeyType, SortParamsType } from "components/Posts/posts-reducer";

type PropsType = {
  title: string;
  sortKey: SortKeyType;
  sortParams: SortParamsType;
  onSort(sortKey: SortKeyType, sortParams: SortParamsType): void;
};
export const SortableColumn: FC<PropsType> = ({
  title,
  sortKey,
  sortParams,
  onSort,
}) => (
  <ColumnHeader
    className={cn(sortKey, { active: sortParams.sortKey === sortKey })}
    onClick={() => onSort(sortKey, sortParams)}
  >
    {title}
    <IconArrow
      className={cn("icon-sort", {
        desc:
          sortParams.sortKey === sortKey && sortParams.sortDirection === "desc",
      })}
    />
  </ColumnHeader>
);

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 19px 11px;

  &.id {
    flex: 0 1 10%;
  }

  &.title {
    flex: 0 1 50%;
  }

  &.body {
    flex: 0 1 40%;
  }

  &.active {
    background-color: var(--active-color);
  }
`;
