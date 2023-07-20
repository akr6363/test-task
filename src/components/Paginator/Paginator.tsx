import React from 'react';
import {fetchPosts} from "../Posts/posts-reducer";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import styled from "styled-components";
import cn from 'classnames';

export const Paginator = () => {
    const pageSize = useAppSelector((state) => state.posts.pageSize);
    const currentPage = useAppSelector((state) => state.posts.currentPage);
    const pageTotalCount = useAppSelector((state) => state.posts.pageTotalCount);
    const searchValue = useAppSelector((state) => state.posts.searchValue);

    const dispatch = useAppDispatch();
    const inactivePagesOnEachSide = 2
    const leftBoundary = currentPage - inactivePagesOnEachSide;
    const rightBoundary = currentPage + inactivePagesOnEachSide;

    const pageCount = Math.ceil(pageTotalCount / pageSize);
    let numbersArray = [];
    for (let i = 1; i <= pageCount; i++) {
        numbersArray.push(i);
    }

    const setPrevPage = () => {
        dispatch(fetchPosts(currentPage - 1));
    };
    const setNextPage = () => {
        dispatch(fetchPosts(currentPage + 1));
    };

    const changePage = (page: number) => {
        dispatch(fetchPosts(page, searchValue));
    }

    return (
        <Pagination>
            <SwitchBtn onClick={setPrevPage} disabled={currentPage === 1}>Назад</SwitchBtn>
            <Pages>
                {numbersArray
                    .filter(
                        (p) => {
                            if (leftBoundary < 1) {
                                return p >= leftBoundary && p <= inactivePagesOnEachSide * 2 + 1
                            }
                            if (rightBoundary > pageCount) {
                                return p >= (-inactivePagesOnEachSide * 2) + pageCount && p <= rightBoundary
                            }
                            return p >= leftBoundary && p <= rightBoundary
                        }
                    )
                    .map((p) => {
                        return (
                            <Page
                                key={p}
                                className={cn({'current': currentPage === p})}
                                onClick={() => changePage(p)}
                            >
                                {p}
                            </Page>
                        );
                    })}
            </Pages>
            <SwitchBtn onClick={setNextPage} disabled={currentPage === pageCount}>Вперед</SwitchBtn>
        </Pagination>
    );
};

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 30px;
  color: var(--main-color)
`

const SwitchBtn = styled.button`
  all: unset;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    color: rgba(0, 0, 0, 0.48);
    cursor: no-drop;
  }
`

const Pages = styled.div`
  display: flex;
`
const Page = styled.div`
  font-size: 18px;
  font-style: italic;
  font-weight: 700;

  &:not(:last-child) {
    margin-right: 15px;
  }

  &.current {
    color: #7EBC3C;
  }

`
