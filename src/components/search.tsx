import React, { useState } from 'react';
import WindowTop from './window-top.tsx';
import * as W from '../styles/window.ts';
import * as S from '../styles/search.ts';

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  return (
    <W.Window>
      <WindowTop />
      <S.Form>
        <S.FormInput
          onChange={onChange}
          name="searchKeyword"
          value={searchKeyword}
          placeholder="검색하기"
          type="text"
          required
        ></S.FormInput>
        <button type="submit">검색</button>
      </S.Form>
    </W.Window>
  );
}
