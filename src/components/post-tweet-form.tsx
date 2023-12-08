import React, { useState } from 'react';
import * as S from '../styles/components/post-tweet-form.ts';

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  return (
    <S.Form>
      <S.TextArea
        onChange={onChange}
        value={tweet}
        rows={5}
        maxLength={180}
        placeholder="지금 무슨 일이 일어나고 있나요?"
      />
      <S.AttachFileButton htmlFor="file">
        {file ? '사진 첨부 ✔' : '사진 추가'}
      </S.AttachFileButton>
      <S.AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <S.SubmitButton type="submit">
        {isLoading ? '포스팅 중...' : '포스팅'}
      </S.SubmitButton>
    </S.Form>
  );
}
