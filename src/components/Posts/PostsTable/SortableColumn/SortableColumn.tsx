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
export const SortableColumn: FC<PropsType> = ({ title, sortKey, sortParams, onSort }) => (
  <ColumnHeader
    className={cn(sortKey, { active: sortParams.sortKey === sortKey })}
    onClick={() => onSort(sortKey, sortParams)}
  >
    {title}
    <IconSort className={cn({ desc: sortParams.sortKey === sortKey && sortParams.sortDirection === "desc" })}>
      <IconArrow />
    </IconSort>
  </ColumnHeader>
);

const IconSort = styled.div`
  padding-left: 40px;
  @media (max-width: 768px) {
    padding-left: 20px;
  }
  @media (max-width: 480px) {
    padding-left: 5px;
  }
  svg {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
    @media (max-width: 768px) {
      width: 8px;
    }
  }
  &.desc svg {
    transform: none;
    transition: transform 0.3s ease-in-out;
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 19px 11px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    padding: 19px 6px;
  }
  &.id {
    flex: 0 1 10%;
  }

  &.title {
    flex: 0 1 50%;
    @media (max-width: 768px) {
      flex: 0 1 40%;
    }
  }

  &.body {
    flex: 0 1 40%;
    @media (max-width: 768px) {
      flex: 0 1 50%;
    }
  }

  &.active {
    background-color: var(--active-color);
  }
`;
