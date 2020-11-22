import { Alert } from 'react-native';

export default function AlertCustom({
  title, message, onCancel, onOk
}) {
  return (
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancel',
          onPress: onCancel,
          style: 'cancel'
        },
        { text: 'Save', onPress: onOk }
      ],
      { cancelable: false }
    ));
}
