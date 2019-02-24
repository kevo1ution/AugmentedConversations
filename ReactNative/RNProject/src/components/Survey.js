import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ScrollView, Image, TextInput, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card } from './Card';
import { CardSection } from './CardSection';
import { Icon } from 'native-base';
import InitialParse from './InitialParse.js';

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: null,
            state: null,
            //ids: {1: false, 2: false, 3: false, 4:false, 5:false, 6:false, 7:false, 8:false, 9:false, 10:false}
            ids: [false, false, false, false, false, false, false, false, false, false]
        }
    };

    setCity(input) {
        this.state.city = input;
    }

    setLocation(input) {
        this.state.state = input;
    }

    toggleIds(id) {
        //if (this.state.ids[id]) this.state.ids[id] = false;
        //else this.state.ids[id] = true;
        this.state.ids[id-1] = !this.state.ids[id-1];
        this.setState({99: false});
    }

    getButtonStyle(id) {
        if (this.state.ids[id-1]) return {flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 10};
        return {flex: 1, backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 10};
    }

    render() {
        var comps = InitialParse.map((interest, index) => {
          var path = interest.imagePath;
          return (
              <View>
                  <TouchableHighlight
                      underlayColor='transparent'
                      onPress={() => this.toggleIds(index+1)}
                  >
                      <ImageBackground imageStyle={{borderRadius: 10}} style={styles.img} source={interest.imagePath}>
                          <View style={this.getButtonStyle(index+1)}>
                          </View>
                      </ImageBackground>
                  </TouchableHighlight>
                  <Text style={styles.imgTxt}>{interest.interest}</Text>
              </View>
          );
        });

        return (
            <View style={{height: '100%', backgroundColor: 'white'}}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={{fontSize: 15, alignSelf: 'center', fontWeight: 'bold'}}> Pick three interests! </Text>
                </View>
                <View>
                    <ScrollView style={styles.grid}>
                        <View style={styles.row}>
                          { comps }
                        </View>
                    </ScrollView>
                </View>
                <View
                    style={styles.footer}
                >
                    <TouchableHighlight
                        underlayColor='rgb(226, 118, 141)'
                        style={styles.button}
                    >
                        <Text
                            style={styles.buttonText}
                            onPress={() => Actions.camera()}
                        > Finish Preferences </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = {
    headerWrap: {
        color: 'white',
        borderBottomWidth: 0,
        borderColor: '#ddd',
        shadowColor: '#000',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        elevation: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        flexWrap: 'wrap',
        width: '95%',
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 10
    },
    header: {
        paddingTop: 5,
        marginBottom: 7.5,
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'System',
        fontWeight: 'bold',
    },
    grid: {
        margin: 20,
        marginTop: 30,
        height: '80%',
        backgroundColor: 'white'
    },
    InputStyling: {
        borderBottomWidth: 0,
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'rgba(200, 200, 200, .6)',
        borderColor: 'grey',
        flexDirection: 'row',
    },
    InputContainer: {
        paddingTop: 20,
        paddingRight: 15,
        paddingLeft: 15,
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    imgSelected: {

    },
    footer: {
        backgroundColor: 'rgba(246, 246, 246, 0.98)',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingBottom: 20,
        // borderWidth: 2,
        // borderColor: 'green',
    },
    button: {
        backgroundColor: '#FF7C93',
        margin: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    check: {
        fontSize: 100,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    imgTxt: {
        marginTop: 5,
        alignSelf: 'center',
        color: '#FF7C93',
        fontWeight: 'bold',
    },
};


export default Survey;
