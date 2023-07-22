import {useAppSelector} from "../../../common/hooks/useAppSelector";
import styled from "styled-components";
import React, {FC, useEffect} from "react";
import {Post} from "../Post/Post";
import {fetchPosts, setCurrentPage, setSortParams, SortKeyType, SortParamsType} from "../posts-reducer";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {ReactComponent as IconArrow} from '../../../assets/img/arrow-sort.svg'
import cn from "classnames";
import {useNavigate, useParams} from "react-router-dom";


export const PostsTable = () => {
    const posts = useAppSelector(state => state.posts.posts)
    const currentPage = useAppSelector(state => state.posts.currentPage)
    const sortParams = useAppSelector(state => state.posts.sortParams)
    const searchValue = useAppSelector((state) => state.posts.searchValue);


    const navigate = useNavigate();
    if (window.location.pathname === '/') {
        navigate('/1');
    }

    const { id } = useParams();

    const dispatch = useAppDispatch()
    const postsItems = <>
        {posts.map(p => {
            return (
                <Post post={p} key={p.id}/>
            )
        })}
    </>

    useEffect(() => {
        if (id) {
            dispatch(setCurrentPage(Number(id)))
        }

    }, [id])

    useEffect(()=> {
        dispatch(fetchPosts())
    }, [sortParams, searchValue, currentPage])

    type SortableColumnProps = {
        title: string;
        sortKey: SortKeyType;
        sortParams: SortParamsType;
        onSort(sortKey: SortKeyType, sortParams: SortParamsType): void;
    };

    const SortableColumn: FC<SortableColumnProps> = ({title, sortKey, sortParams, onSort}) => (
        <ColumnHeader
            className={cn(sortKey, {active: sortParams.sortKey === sortKey})}
            onClick={() => onSort(sortKey, sortParams)}
        >
            {title}
            <IconArrow
                className={cn('icon-sort', {
                    desc: sortParams.sortKey === sortKey && sortParams.sortDirection === 'desc'
                })}
            />
        </ColumnHeader>
    );

    const tableHeaders = [
        {title: 'ID', sortKey: 'id' as SortKeyType},
        {title: 'Заголовок', sortKey: 'title' as SortKeyType},
        {title: 'Описание', sortKey: 'body' as SortKeyType}
    ];

    const onSort = (sortKey: SortKeyType, sortParams: SortParamsType) => {
        let params :SortParamsType= {
            sortKey: sortKey,
            sortDirection: 'asc'
        }
        if (sortKey === sortParams.sortKey && sortParams.sortDirection === 'asc') {
            params.sortDirection = 'desc'
        }
        dispatch(setSortParams(params))
    }

    return (
        <TableContainer>
            <TableHeader>
                {tableHeaders.map(({title, sortKey}) => (
                    <SortableColumn
                        key={sortKey}
                        title={title}
                        sortKey={sortKey}
                        sortParams={sortParams}
                        onSort={onSort}
                    />
                ))}
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

`
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