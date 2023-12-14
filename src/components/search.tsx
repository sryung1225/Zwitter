import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { searchKeywordAtom } from '../atoms.tsx';
import WindowTop from './window-top.tsx';
import * as W from '../styles/window.ts';
import * as S from '../styles/search.ts';
import { ReactComponent as IconSearch } from '../assets/images/i-search.svg';

export default function Search() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordAtom);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue === '') return;
    setSearchKeyword(searchValue);
    setSearchValue('');
    navigate(`/search/searchKeyword=${searchKeyword}`);
  };
  useEffect(() => {
    if (searchKeyword) {
      navigate(`/search/searchKeyword=${searchKeyword}`);
    }
  }, [searchKeyword, navigate]);
  return (
    <W.Window>
      <WindowTop />
      <S.Form onSubmit={onSubmit}>
        <S.FormInput
          onChange={onChange}
          name="searchKeyword"
          value={searchValue}
          placeholder="검색어 입력"
          type="text"
          required
        ></S.FormInput>
        <S.FormButton type="submit">
          <span className="a11yHidden">검색하기</span>
          <IconSearch />
        </S.FormButton>
      </S.Form>
    </W.Window>
  );
}
