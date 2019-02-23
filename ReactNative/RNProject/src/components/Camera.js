import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';

class camera extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          captureAudio={false}
          onPictureTaken={() => console.log("SNAP")}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={styles.ui}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture} />
        </View>
      </View>
    );
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log("PICK TAKEN");
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
  },
  preview: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    display: 'flex',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 50,
    backgroundColor: 'rgba(235, 235, 235, .7)',
    height: 80,
    width: 80,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    margin: 20,
    marginBottom: 40,
    justifyContent: 'center'
  },
  ui: {
    display: "flex", 
    position: 'absolute',
    flexDirection: 'row', 
    justifyContent: 'center', 
    backgroundColor: 'transparent',
    width: "100%", 
    height: "100%", 
    zIndex: 1
  },
  back: {
    display: "flex", 
    position: "absolute", 
    top: "7%", 
    right: "85%",
    color: "white"
  }
});

export default camera;
