import React, { useEffect, useState } from 'react';
import { imageRequest } from '@/utils/request';

interface ImageLoaderPropsType {
  url?: string;
  className: any;
  alt?: string;
}

export default function ImageLoader({ url, className, alt, ...props }: ImageLoaderPropsType) {
  const [image, setImage] = useState<Blob>();
  useEffect(() => {
    if (url) {
      imageRequest.get(url).then(payloadImage => {
        setImage(payloadImage);
      });
    }
  }, []);
  return (
    <img
      src={image !== undefined ? URL.createObjectURL(image) : ''}
      className={className}
      alt={alt}
      {...props}
    />
  );
}
