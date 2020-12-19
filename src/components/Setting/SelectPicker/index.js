import React from 'react';
import {
  Icon, Picker, Form
} from 'native-base';

export default function SelectPicker({ iosHeader, options = [], selectedValue }) {
  return (
    <Form>
      <Picker
        mode="dropdown"
        iosHeader={iosHeader}
        iosIcon={<Icon name="arrow-down" />}
        selectedValue={selectedValue}
        onValueChange={() => {}}
      >
        {options.map((item) => (
          <Picker.Item
            key={item}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </Form>
  );
}
