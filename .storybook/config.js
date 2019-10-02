import { configure, addDecorator, addParameters } from '@storybook/react';
import { addReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withA11y } from '@storybook/addon-a11y';

addDecorator(withKnobs);
addDecorator(addReadme);
addDecorator(withA11y);

addParameters({
  readme: {
      codeTheme: 'github',
  },
});

configure(require.context('../src', true, /.stories.(js|jsx|ts|tsx)$/))
