'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { SiteMediaMap, watchSiteMedia } from '@/lib/site-media';

const SiteMediaContext = createContext<SiteMediaMap>({});

export function SiteMediaProvider({ children }: { children: ReactNode }) {
  const [media, setMedia] = useState<SiteMediaMap>({});

  useEffect(() => watchSiteMedia(setMedia), []);

  useEffect(() => {
    const hero = media.hero || '/images/hero.jpg';
    const finalCta = media['category-replacement'] || '/images/category-replacement.jpg';
    document.documentElement.style.setProperty('--site-hero-image', `url("${hero}")`);
    document.documentElement.style.setProperty('--site-final-cta-image', `url("${finalCta}")`);
  }, [media]);

  return <SiteMediaContext.Provider value={media}>{children}</SiteMediaContext.Provider>;
}

export function useSiteMedia() {
  return useContext(SiteMediaContext);
}
