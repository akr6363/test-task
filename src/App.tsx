import React, {useEffect} from 'react';
import './App.css';
import {fetchPosts, setCurrentPage, setSearchValue} from "./components/Posts/posts-reducer";
import {useAppDispatch} from "./common/hooks/useAppDispatch";
import styled from "styled-components";
import {Paginator} from "./components/Paginator/Paginator";
import {SearchInput} from "./components/SearchInput/SearchInput";
import {PostsTable} from "./components/Posts/PostsTable/PostsTable";
import {ReactComponent as IconSearch} from './assets/img/search.svg'
import {Route, Routes, useNavigate} from "react-router-dom";

function App() {

    const dispatch = useAppDispatch()

    const SearchPosts = (value: string | undefined) => {
        if(value !== undefined) {
            dispatch(setSearchValue(value))
            dispatch(setCurrentPage(1))
        }
    }


    return (
        <div className="App">
            <Container>
                <SearchInputContainer>
                    <SearchInput onChange={SearchPosts} styles={stylesForInput} placeholder='Поиск'>
                        <IconSearch className={'icon-placeholder'}/>
                    </SearchInput>
                </SearchInputContainer>
                <Routes>
                    <Route path={"/"} element={<PostsTable/>}>
                        <Route path={":id"} element={<PostsTable/>}/>
                    </Route>
                </Routes>
                <Paginator/>
            </Container>
        </div>
    );
}

export default App;

const stylesForInput = {
    boxSizing: 'border-box',
    width: '100%',
    padding: '16px 25px',
    backgroundColor: '#5A5C66',
    outline: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: '400',
    color: '#B2B7BF',
}
const SearchInputContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
  width: 59%;
`
const Container = styled.div`
  max-width: 1077px;
  box-sizing: border-box;
  margin: 0 auto;
`
