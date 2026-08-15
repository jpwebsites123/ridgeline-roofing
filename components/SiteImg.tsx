'use client';

import { CSSProperties, ImgHTMLAttributes } from 'react';
import { useSiteMedia } from './SiteMediaProvider';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  slot: string;
  fallback: string;
  fill?: boolean;
};

export default function SiteImg({ slot, fallback, fill, style, ...props }: Props) {
  const media = useSiteMedia();
  const fillStyle: CSSProperties | undefined = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style }
    : style;
  return <img src={media[slot] || fallback} style={fillStyle} {...props} />;
}
