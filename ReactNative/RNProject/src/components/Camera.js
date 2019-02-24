/* eslint-disable no-console */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera, FaceDetector } from 'react-native-camera';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
  Defs,
  Stop} from 'react-native-svg';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    isRecording: false,
    dots: []
  };

  setLandmarks(fObj) {
    return;
    var currDots = [];
    console.log(fObj);
    if (fObj.faces.length == 0){
      this.setState({dots: currDots});
      return;
    } 
    return;
    let landmarks = fObj.faces[0].getLandmarks();
    console.log(landmarks);
    for (let i = 0; i < landmarks.length; i++) {
      let point = landmarks[i].getPosition();
      console.log(point);
      currDots.push({x: point.x, y: point.y});
    }
    this.setState({dots: currDots});
  }

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        onFacesDetected={face => this.setLandmarks(face)}
        faceDetectorSettings={{
          mode: RNCamera.Constants.FaceDetection.Mode.accurate,
        }}
        //faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}

        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
      </RNCamera>
    );
  }

  render() {
    const dotList = this.state.dots.map((data) => {
      return (
          <Circle
            cx={data.x}
            cy={data.y}
            r="3"
            fill="black"
          />
      )
    })
    console.log(dotList)
    return (
    <View 
      style={styles.container}
    >
      {this.renderCamera()}
    <Svg
      width="100%"
      height="100%">
      {dotList}
    </Svg>
    </View>
    );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
});