
import React from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import logoImg from '../../../assets/images/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "cornflowerblue"
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize: 24,
    width: "80%",
    textAlign: 'center'
  },
  buttonContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2980b9',
    width: '80%',
    padding: 15,
    borderRadius: 20
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default function LoginView () {
  const onPressLogin = React.useCallback(() => {
    console.log("login")
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={logoImg}
        />
        <Text style={styles.title}>
          Welcome to receipt management
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={onPressLogin}
          style={styles.button}
        >
          <Text style={styles.appButtonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

