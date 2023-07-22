import React, { useEffect } from "react";
import { useAppSelector } from "common/hooks/useAppSelector";
import styled from "styled-components";
import cn from "classnames";
import { NavLink, useNavigate } from "react-router-dom";

export const Paginator = () => {
  const pageSize = useAppSelector((state) => state.posts.pageSize);
  const currentPage = useAppSelector((state) => state.posts.currentPage);
  const pageTotalCount = useAppSelector((state) => state.posts.pageTotalCount);
  const inactivePagesOnEachSide = 2;
  const leftBoundary = currentPage - inactivePagesOnEachSide;
  const rightBoundary = currentPage + inactivePagesOnEachSide;

  const navigate = useNavigate();
  const pageCount = Math.ceil(pageTotalCount / pageSize);

  useEffect(() => {
    if (currentPage > pageCount && pageCount !== 0) {
      navigate("/1");
    }
  }, [pageCount]);

  let numbersArray = [];
  for (let i = 1; i <= pageCount; i++) {
    numbersArray.push(i);
  }

  const setPrevPage = () => {
    navigate(`/${currentPage - 1}`);
  };
  const setNextPage = () => {
    navigate(`/${currentPage + 1}`);
  };

  const filteredArray = numbersArray.filter((p) => {
    if (leftBoundary < 1) {
      return p >= leftBoundary && p <= inactivePagesOnEachSide * 2 + 1;
    }
    if (rightBoundary > pageCount) {
      return (
        p >= -inactivePagesOnEachSide * 2 + pageCount && p <= rightBoundary
      );
    }
    return p >= leftBoundary && p <= rightBoundary;
  });

  return (
    <Pagination>
      <SwitchBtn onClick={setPrevPage} disabled={currentPage === 1}>
        Назад
      </SwitchBtn>
      <Pages>
        {filteredArray.map((p) => {
          return (
            <Page key={p} className={cn({ current: currentPage === p })}>
              <NavLink to={`/${p}`}>{p}</NavLink>
            </Page>
          );
        })}
      </Pages>
      <SwitchBtn onClick={setNextPage} disabled={currentPage === pageCount}>
        Вперед
      </SwitchBtn>
    </Pagination>
  );
};

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 30px;
  color: var(--main-color);
`;

const SwitchBtn = styled.button`
  all: unset;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  &:disabled {
    color: rgba(0, 0, 0, 0.48);
    cursor: no-drop;
  }
  &:hover:not(:disabled) {
    color: var(--active-color);
    transition: color 0.3s ease-in-out;
  }
`;

const Pages = styled.div`
  display: flex;
`;
const Page = styled.div`
  font-size: 18px;
  font-style: italic;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  a {
    color: inherit;
    text-decoration: none;
  }

  &:not(:last-child) {
    margin-right: 15px;
  }

  &.current,
  &:hover {
    color: var(--active-color);
    transition: color 0.3s ease-in-out;
  }
`;
