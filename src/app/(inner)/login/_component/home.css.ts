import { globalStyle, style } from '@vanilla-extract/css';
import { BOX_SHADOW, BREAK_POINT, flexCenter, responsive } from '@/style/var';
import { global } from '@/style/globalTheme.css';

export const wrap = style([
  {
    boxSizing: 'border-box',
    maxWidth: BREAK_POINT.sm,
    margin: '0 auto',
    marginTop: '3.5rem',
    width: '100%',
    padding: '1rem',
  },
]);

export const inner = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '2rem',
  borderTop: '1px solid #e5e5e5',
  flexDirection: 'column',
  height: '30rem',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: 10,
  boxShadow: BOX_SHADOW,
});

globalStyle(`${inner} > p`, {
  fontSize: '1.5rem',
  textAlign: 'center',
  lineHeight: 1.5,
  fontWeight: 500,
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 500,
  // color: global.color.lightFont,
  marginBottom: '1rem',
});

export const imgBox = style({
  width: '100%',
  margin: '1rem auto',
});

globalStyle(`${imgBox} > img`, {
  objectFit: 'contain',
  width: '100%',
});

export const buttonBox = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: '1rem',
});

export const googleLoginButton = style([
  flexCenter,
  {
    width: 40,
    height: 40,
    boxShadow: BOX_SHADOW,
    columnGap: '0.5rem',
    fontSize: '1.25rem',
    borderRadius: '50%',
    backgroundColor: '#fff',
    fontWeight: 600,
  },
]);
