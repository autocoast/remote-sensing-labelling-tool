import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { PurpleTheme, DarkPurpleTheme } from '@/theme/LightTheme';

export default createVuetify({
  components,
  directives,

  theme: {
    defaultTheme: 'DarkPurpleTheme',
    themes: {
      PurpleTheme,
      DarkPurpleTheme
    }
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md'
    },
    VTextField: {
      rounded: 'lg'
    },
    VTooltip: {
      // set v-tooltip default location to top
      location: 'top'
    }
  }
});
