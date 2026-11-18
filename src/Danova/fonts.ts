// ============================================================
// Font Loading — menggunakan @remotion/google-fonts
// Import file ini di Root.tsx supaya font ter-load
// ============================================================

import { loadFont as loadPoppins } from '@remotion/google-fonts/Poppins';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const poppinsLoaded = loadPoppins('normal', {
  weights: ['500', '600', '700', '800', '900'],
  subsets: ['latin'],
  ignoreTooManyRequestsWarning: true,
});
const interLoaded = loadInter('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
  ignoreTooManyRequestsWarning: true,
});

export const FONTS = {
  heading: poppinsLoaded.fontFamily,
  body: interLoaded.fontFamily,
} as const;
