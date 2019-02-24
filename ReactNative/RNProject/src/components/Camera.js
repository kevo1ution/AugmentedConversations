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
import { ARKit } from 'react-native-arkit';

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
    type: 'front',
    whiteBalance: 'auto',
    ratio: '16:9',
    isRecording: false,
    dots: []
  };
  componentWillMount() {
    this.takePicture();
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  setLandmarks(fObj) {
    var currDots = [];
    if (fObj.faces.length == 0){
      console.log("No Face!");
      this.setState({dots: currDots});
      return;
    } 
    fObjKeys = Object.keys(fObj.faces[0]);
    for(var i = 0; i<fObjKeys.length; i++){
      if(fObjKeys[i].includes("Position")){
        var val = fObj.faces[0][fObjKeys[i]];
        currDots.push({x: val.x, y: val.y});
      }
    }
    this.setState({dots: currDots});
  }

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.log(data);
      //ImgToBase64.getBase64String(data.uri);
      // .then(base64string => {
      //     fetch('http://ec2-18-191-151-255.us-east-2.compute.amazonaws.com:8080/image', {
      //         method: 'post',
      //         headers: { 
      //             'Accept': 'application/json',
      //             'Content-Type': 'application/json' 
      //         },
      //         body: JSON.stringify({
      //             'image': base64string
      //         })
      //     }).then(res => res.json()).then(data2 => {
      //         console.log(data2);
      //     }).catch(err => {
      //         console.log(err);
      //     })
      // });
    }
    setTimeout(this.takePicture.bind(this), 1000);
  };

  renderCamera() {
    const dotList = this.state.dots.map((data) => {
      return (
          <Circle
            cx={data.x}
            cy={data.y}
            r="5"
            fill="white"
          />
      )
    });
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
          mode: RNCamera.Constants.FaceDetection.Mode.fast
        }}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}

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
        <View
          style={{position:'absolute', top:0, left:0, height: "100%", width:"100%"}}
        >
          <View
            style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
              <Text style={styles.flipText}> FLIP </Text>
            </TouchableOpacity>
          </View>
          <Svg
            width="100%"
            height="100%"
            fill="transparent"
          >
            {dotList}
          </Svg>
        </View>
      </RNCamera>
    );
  }

  render() {
    return (
    <View style={{ flex: 1 }}>
      <ARKit
        style={{ flex: 1 }}
        debug // debug mode will show feature points detected and 3D axis
        planeDetection // turn on plane detection
        lightEstimation // turn on light estimation
      >
        <ARKit.Box
          pos={{ x: 0, y: 0, z: 0 }}
          shape={{ width: 0.1, height: 0.1, length: 0.1, chamfer: 0.01 }}
        />
      </ARKit>
    </View>
    // <View 
    //   style={styles.container}
    // >
    //   {this.renderCamera()}
    // </View>
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