/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { Camera } from 'expo-camera';
import { View } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomCamera({ handleUploadFile }) {
  const cameraInstance = React.useRef(null);
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const captureImage = React.useCallback(async () => {
    if (cameraInstance.current) {
      const photo = await cameraInstance.current.takePictureAsync();
      const uriPaths = photo.uri.split('.');
      handleUploadFile({
        fileName: `receipt.${uriPaths[uriPaths.length - 1]}`,
        uri: photo.uri,
        type: `image/${uriPaths[uriPaths.length - 1]}`
      });
    }
  }, [handleUploadFile]);

  return (

    <View style={styles.container}>
      <Camera
        type={Camera.Constants.Type.back}
        ref={cameraInstance}
        style={{ flex: 1 }}
      >

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
          }}
        >
          <TouchableOpacity
            onPress={captureImage}
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              backgroundColor: '#fff',
              left: '22.5%'
            }}
            activeOpacity={0.8}
          />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
