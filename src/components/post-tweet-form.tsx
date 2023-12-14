import React, { useState } from 'react';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase.ts';
import * as S from '../styles/post-tweet-form.ts';
import { ReactComponent as IconPhoto } from '../assets/images/i-photo.svg';

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (images && images.length === 1) {
      setImage(images[0]);
      const previewUrl = URL.createObjectURL(images[0]);
      setImagePreview(previewUrl);
    }
  };
  const onImageDelete = () => {
    setImage(null);
    setImagePreview('');
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === '' || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        userName: user.displayName || 'Anonymous',
        userId: user.uid,
      });
      if (image) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, image);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet('');
      setImage(null);
      setImagePreview('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <S.Form onSubmit={onSubmit}>
      <S.TextArea
        onChange={onChange}
        value={tweet}
        rows={5}
        maxLength={180}
        placeholder="지금 무슨 일이 일어나고 있나요?"
      />
      {imagePreview ? (
        <>
          <S.AttachImagePreview src={imagePreview} alt="첨부이미지 미리보기" />
          <S.AttachImageDelete type="button" onClick={onImageDelete} />
        </>
      ) : (
        <S.AttachImageButton htmlFor="image">
          <IconPhoto />
        </S.AttachImageButton>
      )}
      <S.AttachImageInput
        onChange={onImageChange}
        type="file"
        id="image"
        accept="image/*"
      />
      <S.SubmitButton type="submit">
        {isLoading ? '포스팅 중...' : '포스팅'}
      </S.SubmitButton>
    </S.Form>
  );
}
