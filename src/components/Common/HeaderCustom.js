import React from 'react';
import {
  Header, Title, Body, Left, Right
} from 'native-base';
import {
  StyleSheet
} from 'react-native';

export default function HeaderCustom({
  title, left, right, ...rest
}) {
  return (
    <Header {...rest}>
      {left && <Left>{left}</Left>}
      <Body style={styles.body}>
        {title && <Title>{title}</Title>}
      </Body>
      {right && <Right>{right}</Right>}
    </Header>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 6,
  },
});
