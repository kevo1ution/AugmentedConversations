import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Home from './components/Home';
import CameraComponent from './components/Camera';
console.disableYellowBox = true;
const RouterComponent = () => {
  return (
    <Router>
        <Scene key="root" hideNavBar>
            <Scene key="home" component={Home} title="Home" hideNavBar />
            <Scene key="camera" component={CameraComponent} title="Camera" hideNavBar />
        </Scene>
    </Router>
  );
};


export default RouterComponent;
