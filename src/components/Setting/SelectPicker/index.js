import React from 'react';
import {
  Icon, Picker, Form
} from 'native-base';

export default function SelectPicker({ iosHeader, options = [] }) {
  return (
    <Form>
      <Picker
        mode="dropdown"
        iosHeader={iosHeader}
        iosIcon={<Icon name="arrow-down" />}
        // selectedValue={this.state.selected}
        // onValueChange={this.onValueChange.bind(this)}
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
