import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import searchKeywordAtom from '@atom/search-keyword.tsx';
import * as S from '@style/search-input.ts';
import { ReactComponent as IconSearch } from '@img/i-search.svg';

export default function SearchKeyword() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const setSearchKeyword = useSetRecoilState(searchKeywordAtom);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchKeyword(searchValue);
    setSearchValue('');
    navigate(`/search?query=${searchValue}`);
  };
  return (
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
  );
}
