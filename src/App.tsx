import React, {useEffect} from 'react';
import './App.css';
import {fetchPosts, setCurrentPage, setSearchValue} from "./components/Posts/posts-reducer";
import {useAppSelector} from "./common/hooks/useAppSelector";
import {useAppDispatch} from "./common/hooks/useAppDispatch";
import Post from "./components/Posts/Post/Post";
import styled from "styled-components";
import {Paginator} from "./components/Paginator/Paginator";
import {SearchInput} from "./components/SearchInput/SearchInput";
import {PostsTable} from "./components/Posts/PostsTable/PostsTable";


function App() {

    const currentPage = useAppSelector(state => state.posts.currentPage)
    const dispatch = useAppDispatch()

    const SearchPosts = (value: string) => {
        dispatch(fetchPosts(1, value))
        dispatch(setSearchValue(value))
    }

    useEffect(() => {
        dispatch(fetchPosts(currentPage))
    }, [])


    return (
        <div className="App">
            <div className={'container'}>
                <SearchInputContainer>
                    <SearchInput onChange={SearchPosts} styles={stylesForInput} placeholder='Поиск'/>
                </SearchInputContainer>
                <PostsTable/>
                <Paginator/>
            </div>
        </div>
    );
}

export default App;

const stylesForInput = {
    flex: '0 1 60%',
    padding: '16px 25px',
    backgroundColor: '#5A5C66',
    outline: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: '400',
    color: '#B2B7BF',
}

const SearchInputContainer = styled.div`
  margin-bottom: 15px;
  display: flex;

`