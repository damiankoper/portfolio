import { ThemeDefinition } from 'vuetify';
import './scss/index.scss';

export const theme = {
  dark: false,
  colors: {
    primary: '#ca2e55', //'#e8c547',
    'primary-container': '#FFD9DD',
    'on-primary-container': '#400012',
    secondary: '#30323d',
    outline: '#BFBDC1',
    outlineVariant: '#EDDDE1',
  },
} satisfies ThemeDefinition;
