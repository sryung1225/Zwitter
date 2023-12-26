import React, { useState } from 'react';
import { deleteField, doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { auth, db, storage } from '@/firebase.ts';
import ITweet from '@type/ITweet.ts';
import CompressImage from '@util/compress-image.tsx';
import useEscClose from '@util/use-esc-close.tsx';
import * as S from '@style/tweet-form.ts';
import { ReactComponent as IconPhoto } from '@img/i-photo.svg';
import { ReactComponent as LoadingSpinner } from '@img/loading-spinner-mini.svg';

interface IEditTweetForm extends Pick<ITweet, 'id' | 'tweet' | 'photo'> {
  onClose: () => void;
}

export default function EditTweetForm({
  id,
  tweet: initialTweet,
  photo: initialPhoto,
  onClose,
}: IEditTweetForm) {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState(initialTweet);
  const onTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialPhoto);
  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (images && images.length === 1) {
      const selectedImage = images[0];
      const compressedImage = await CompressImage({
        imageFile: selectedImage,
        size: 300,
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
    const user = auth.currentUser;
    if (!user || isLoading || tweet === '' || tweet.length > 180) return;
    try {
      setLoading(true);
      const tweetDocRef = doc(db, 'tweets', id);
      await updateDoc(tweetDocRef, {
        tweet,
      });
      if (image) {
        const locationRef = ref(
          storage,
          initialPhoto || `tweets/${user.uid}/${id}`,
        );
        const result = await uploadBytes(locationRef, image);
        const url = await getDownloadURL(result.ref);
        await updateDoc(tweetDocRef, {
          photo: url,
        });
      } else if (!image && initialPhoto && initialPhoto !== imagePreview) {
        const locationRef = ref(storage, initialPhoto);
        await deleteObject(locationRef);
        await updateDoc(tweetDocRef, {
          photo: deleteField(),
        });
      }
      setImage(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  useEscClose(onClose);
  return (
    <S.EditForm onSubmit={onSubmit}>
      <S.TextArea
        onChange={onTweetChange}
        value={tweet}
        rows={5}
        maxLength={180}
        placeholder="지금 무슨 일이 일어나고 있나요?"
        required
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
        <S.AttachImageButton htmlFor="image_edit">
          <IconPhoto />
        </S.AttachImageButton>
      )}
      <S.AttachImageInput
        onChange={onImageChange}
        id="image_edit"
        type="file"
        accept="image/*"
      />
      <S.SubmitButton type="submit">
        {isLoading ? <LoadingSpinner /> : '수정'}
      </S.SubmitButton>
    </S.EditForm>
  );
}
