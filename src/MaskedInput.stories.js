import React, {useState} from 'react';
import { storiesOf } from '@storybook/react';
import { MaskedInput } from './Maskedinput';
import { text } from '@storybook/addon-knobs';

import Readme from './MaskedInput.md';

const ControllingComponent = () => {
  const [val, setVal] = useState(null);
  const handleChange = event => {
    setVal(event.target.value)

  };
  const handleBlur = () => {};

  return (
    <>
      <MaskedInput
        id={text('id','zipcode')}
        pattern={"/d"}
        placeholder={''}
        name={'zip-code'}
        title={'Zip-Code'}
        class={''}
        type={'text'}
        value={val}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
    </>
  )
}

storiesOf('MaskedInput', module)
    .addParameters({
        readme: {
            content: Readme,
        },
    })
    .addParameters({
        info: `Original component documentation: https://github.com/estelle/input-masking`,
    })
    .add('default', () => {
        return (
          <>
            <ControllingComponent

            />
            </>
        );
    })