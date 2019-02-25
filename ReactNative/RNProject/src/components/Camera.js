/* eslint-disable no-console */
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Slider } from 'react-native';
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
  Text,
  Symbol,
  Use,
  Defs,
  Stop,
  TSpan} from 'react-native-svg';
import ImgToBase64 from 'react-native-image-base64';
import { Actions } from 'react-native-router-flux';

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
    p10: 0,
    polyToggle: true,
    prevTime: 0,
    currPerson: -1,
    common: []
  };

  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.snap();
  }

  componentDidMount() {
    this.togglePoly();
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  snap() {
    this.takePicture();
    setTimeout(this.snap.bind(this), 5000);
  }

  setLandmarks(fObj) {
    var currDots = [];
    if (fObj.faces.length == 0){
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

    var first = -1;
    var second = -1;
    var name = -1;

    if(this.state.currPerson != -1){
      name = this.state.currPerson.name;
    } else {
      return;
    }

    if(this.state.common.length >= 1){
      first = this.state.common[0];
    }

    if(this.state.common.length >= 2){
      second = this.state.common[1];
    }

    if(this.state.common.length == 0) {
      first = "Nothing in common"
    }

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
        <Text
          x={this.state.originX+this.state.headWidth-40}
          y={this.state.originY}
          fontSize={35 * this.state.headWidth / 346}
          fontWeight="bold"
          textAnchor="start"
          fill="#fd5c63"
          stroke="white">
          {name != -1 && name}
        </Text>
        <Text
          x={this.state.originX+this.state.headWidth-40}
          y={this.state.originY + 20 + (25 * this.state.headWidth / 346)}
          fontSize={35 * this.state.headWidth / 346}
          fontWeight="bold"
          textAnchor="start"
          fill="#fd5c63"
          stroke="white">
          {first != -1 && first}
        </Text>
        <Text
          x={this.state.originX+this.state.headWidth-40}
          y={this.state.originY + 20 + (25 * this.state.headWidth / 346) + (25 * this.state.headWidth / 346)}
          fontSize={35 * this.state.headWidth / 346}
          fontWeight="bold"
          textAnchor="start"
          fill="#fd5c63"
          stroke="white">
          {second != -1 && second}
        </Text>
      </Svg>
      <Svg
        width="100%"
        height="100%"
        fill="transparent"
      >
      </Svg>
    </Svg>
    )
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      ImgToBase64.getBase64String(data.uri).then(base64string => {
          fetch('http://ec2-user@ec2-34-217-132-105.us-west-2.compute.amazonaws.com:8000/image', {
              method: 'post',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify({
                'image': base64string
              })
          }).then(res => res.json()).then(data2 => {

              if(Object.keys(data2).length !== 0){
                var data = data2[0];
                var otherTraits = data.interests;
                console.log("Traits");
                console.log(data.interests);
                var traits = [];
                for(var i = 0; i<this.props.like.length; i++){
                  let t = this.props.like[i];
                  if (otherTraits.includes(t)) {
                    traits.push(t);
                  }
                }
                console.log(traits);
                this.setState({common: traits, currPerson: data});
              }else{
                this.setState({common: [], currPerson: -1});
              }
          }).catch(err => {
              console.log(err);
          })
      });
    }
  };

  renderPolygons() {
    if ((this.state.p1 == 0 && this.state.p5 == 0) || !this.state.polyToggle) return;
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
        points={this.state.p7.toString() + " " + this.state.p3.toString() + " " + this.state.p9.toString()}
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
        points={this.state.p7.toString() + " " + this.state.p3.toString() + " " + this.state.p10.toString()}
        fill="transparent"
        stroke="white"
        strokeWidth="1"
      />
    </Svg>
    </Svg>
    );
  }

  togglePoly() {
    this.setState({polyToggle: !this.state.polyToggle})
    if (this.state.polyToggle) setTimeout(this.togglePoly.bind(this), 1000)
    else setTimeout(this.togglePoly.bind(this), 2000)
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
          <TouchableOpacity style={styles.flipButton} onPress={() => Actions.survey()}>
             <Text style={styles.flipText}> BACK </Text>
           </TouchableOpacity>
          </View>
          <Svg
            width="100%"
            height="100%"
            fill="transparent"
          >
            {this.state.polyToggle &&
              dotList
            }
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
