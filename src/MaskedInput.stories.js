import React, {useState} from 'react';
import { storiesOf } from '@storybook/react';
import { MaskedInput } from './Maskedinput';
import { text } from '@storybook/addon-knobs';

import Readme from './MaskedInput.md';

const ControllingComponent = () => {
  const [val, setVal] = useState('');
  const handleChange = event => {
    setVal(event.target.value)

  };
  const handleBlur = () => {};

  return (
    <>
      <div>
        The value is: {val}
      </div>
      <div style={{display: 'flex'}}>
        <label htmlFor={text('id','zip')}>{  text('label','Zip Code')}</label>
      <MaskedInput
        id={text('id','zip')}
        placeholder={text('placeholder','xxxxx-xxxx')}
        name={'zip-code'}
        class={''}
        type={text('type','text')}
        value={text('value', val)}
        handleBlur={handleBlur}
        handleChange={handleChange}
        characterSet={text('characterSet','XXXXX-XXXX')}
        label={text('label','Zip Code')}
        pattern={text('pattern','ddddd-dddd')}
        name="zip"
        title={text('title',"9-character zip code in the format of 12345-6789")}
        />
        </div>
    </>
  )
}



const CharacterSetComponent = () => {
  const [val, setVal] = useState('');
  const handleChange = event => {
    setVal(event.target.value)

  };
  const handleBlur = () => {};

  return (
    <>
      <div>
        The value is: {val}
      </div>
      <div style={{display: 'flex'}}>


      <label htmlFor={text('id','zipca')}>{text('label','Canadian Zip Code')}</label>
      <MaskedInput
        id={text('id','zipca')}
        placeholder={text('placeholder','xxx xxx')}
        name={'zip-code'}
        class={''}
        type={text('type','text')}
        value={text('value', val)}
        handleBlur={handleBlur}
        handleChange={handleChange}
        characterSet={text('characterSet','_X_ X_X')}
        pattern={text('pattern','wdw dwd')}
        name="canadianzip"
        title={text('title',"6-character alphanumeric code in the format of A1A 1A1")}
        />
        </div>
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
    .add('default', () => (
      <div style={{padding: '50px'}}>
        <ControllingComponent />
      </div>
    ))
    .add('with characterSet', () => (
      <div style={{padding: '50px'}}>
        <CharacterSetComponent />
      </div>
    ))
    ;