import React from 'react';
import * as urijs from 'urijs';
import ApplicationConfig from '@/config';
interface ImageLoaderPropsType {
  url?: string;
  className: any;
  alt?: string;
}

export default function ImageLoader({ url, className, alt, ...props }: ImageLoaderPropsType) {
  if (!url) {
    return <div className={className} />;
  }
  const token = localStorage.getItem(ApplicationConfig.storeKey.token);
  const link = urijs(url)
    .addQuery('a', token)
    .readable();
  return <img src={link} className={className} alt={alt} {...props} />;
}
