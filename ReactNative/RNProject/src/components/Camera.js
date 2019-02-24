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
    type: 'front',
    whiteBalance: 'auto',
    ratio: '16:9',
    isRecording: false,
    dots: [],
    headHeight: 0,
    headWidth: 0,
    originX: 0,
    originY: 0,
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0,
    p7: 0,
    p8: 0,
    p9: 0,
    p10: 0
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
      this.setState({
        dots: currDots,
        headHeight: 0,
        headWidth: 0,
        originX: 0,
        originY: 0,
        p1: 0,
        p2: 0,
        p3: 0,
        p4: 0,
        p5: 0,
        p6: 0,
        p7: 0,
        p8: 0,
        p9: 0,
        p10: 0
      });
      return;
    } 
    fObjKeys = Object.keys(fObj.faces[0]);
    for(var i = 0; i<fObjKeys.length; i++){
      if(fObjKeys[i].includes("Position")){
        var val = fObj.faces[0][fObjKeys[i]];
        currDots.push({x: val.x, y: val.y});
      }
    }
    const points = fObj.faces[0];
    this.setState({
      dots: currDots,
      headHeight: fObj.faces[0].bounds.size.height,
      headWidth: fObj.faces[0].bounds.size.width,
      originX: fObj.faces[0].bounds.origin.x,
      originY: fObj.faces[0].bounds.origin.y,
      p1: [points.leftEarPosition.x, points.leftEarPosition.y],
      p2: [points.leftEyePosition.x, points.leftEyePosition.y],
      p3: [points.leftMouthPosition.x, points.leftMouthPosition.y],
      p4: [points.leftCheekPosition.x, points.leftCheekPosition.y],
      p5: [points.rightEarPosition.x, points.rightEarPosition.y],
      p6: [points.rightEyePosition.x, points.rightEyePosition.y],
      p7: [points.rightMouthPosition.x, points.rightMouthPosition.y],
      p8: [points.rightCheekPosition.x, points.rightCheekPosition.y],
      p9: [points.noseBasePosition.x, points.noseBasePosition.y],
      p10: [points.bottomMouthPosition.x, points.bottomMouthPosition.y]

    });
  }

  renderText() {
    if (this.state.headHeight == 0) return;
    return (
    <Rect
        x={this.state.originX}
        y={this.state.originY}
        width="150"
        height="50"
        fill="rgb(0,0,255)"
        strokeWidth="3"
        stroke="rgb(0,0,0)"
    />
    )
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

  renderPolygons() {
    if (this.state.p1 == 0 && this.state.p5 == 0) return;
    return (
      <Svg
      width="100%"
      height="100%"
      fill="transparent"
      >
    <Svg
    width="100%"
    height="100%"
    fill="transparent"
    >
      <Polygon
        points={this.state.p1.toString() + " " + this.state.p2.toString() + " " + this.state.p3.toString()}
        fill="transparent"
        stroke="white"
        strokeWidth="1"
      />
    </Svg>
    <Svg
        width="100%"
        height="100%"
        fill="transparent"
    >
      <Polygon
        points={this.state.p1.toString() + " " + this.state.p2.toString() + " " + this.state.p4.toString()}
        fill="transparent"
        stroke="white"
        strokeWidth="1"
      />
    </Svg>
    <Svg
        width="100%"
        height="100%"
        fill="transparent"
    >
      <Polygon
        points={this.state.p5.toString() + " " + this.state.p6.toString() + " " + this.state.p7.toString()}
        fill="transparent"
        stroke="white"
        strokeWidth="1"
      />
    </Svg>
    <Svg
        width="100%"
        height="100%"
        fill="transparent"
    >
      <Polygon
        points={this.state.p5.toString() + " " + this.state.p6.toString() + " " + this.state.p8.toString()}
        fill="transparent"
        stroke="white"
        strokeWidth="1"
      />
    </Svg>
    <Svg
        width="100%"
        height="100%"
        fill="transparent"
    >
      <Polygon
        points={this.state.p8.toString() + " " + this.state.p4.toString() + " " + this.state.p9.toString()}
        fill="transparent"
        stroke="white"
        strokeWidth="1"
      />
    </Svg>
    <Svg
        width="100%"
        height="100%"
        fill="transparent"
    >
      <Polygon
        points={this.state.p4.toString() + " " + this.state.p8.toString() + " " + this.state.p10.toString()}
        fill="transparent"
        stroke="white"
        strokeWidth="1"
      />
    </Svg>
    </Svg>
    );
  }

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
            <Svg
                width="100%"
                height="100%"
                fill="transparent"
            >
            {this.renderText()}
            </Svg>
            {this.renderPolygons()}
          </Svg>
        </View>
      </RNCamera>
    );
  }

  render() {
    return (
    <View 
      style={styles.container}
    >
      {this.renderCamera()}
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
