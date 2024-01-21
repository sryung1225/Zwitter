import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import CompressImage from '@util/compress-image.tsx';
import ScrollTop from '@util/scroll-top.tsx';
import * as S from '@style/tweet-form.ts';
import { ReactComponent as IconPhoto } from '@img/i-photo.svg';
import { ReactComponent as LoadingSpinner } from '@img/loading-spinner-mini.svg';

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const currentUser = useRecoilValue(currentUserAtom);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (images && images.length === 1) {
      const selectedImage = images[0];
      const compressedImage = await CompressImage({
        imageFile: selectedImage,
        size: 500,
      });
      setImage(compressedImage);
      const previewUrl = compressedImage
        ? URL.createObjectURL(compressedImage)
        : '';
      setImagePreview(previewUrl);
    }
  };
  const onImageDelete = () => {
    setImage(null);
    setImagePreview('');
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || isLoading || tweet === '' || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        userName: currentUser.userName,
        userId: currentUser.userId,
      });
      if (image) {
        const locationRef = ref(
          storage,
          `tweets/${currentUser.userId}/${doc.id}`,
        );
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
      ScrollTop('timeline');
    }
  };
  return (
    <S.PostForm onSubmit={onSubmit}>
      <S.TextArea
        name="tweetContent"
        onChange={onChange}
        value={tweet}
        rows={5}
        maxLength={180}
        placeholder="지금 무슨 일이 일어나고 있나요?"
      />
      {imagePreview ? (
        <>
          <S.AttachImagePreview
            src={imagePreview}
            alt="첨부이미지 미리보기"
            width="120"
            height="120"
          />
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
        {isLoading ? <LoadingSpinner /> : '포스팅'}
      </S.SubmitButton>
    </S.PostForm>
  );
}
