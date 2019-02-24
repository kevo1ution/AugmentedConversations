import React, { Component } from 'react';
import { View, Text, TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
    render() {
        return (
            <View
                style={{flex:1}}
            >
                <TouchableHighlight
                    style={{flex:1, backgroundColor: "yellow", justifyContent: "center"}}
                    onPress={() => Actions.camera()}
                >
                    <Text> Click to go Next </Text>
                </TouchableHighlight>
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
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    header: {
        marginLeft: 15,
        marginBottom: 7.5,
        fontSize: 40,
        fontFamily: 'System',
        fontWeight: 'bold',
    },
    header2: {
        fontSize: 30,
        marginLeft: 15,
        marginBottom: 17.5,
    },
    button: {
        backgroundColor: '#FF7C93',
        margin: 15,
        marginBottom: 0,
        marginTop: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
    },
    ViewContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignSelf: 'center',
    },
    footer: {
        backgroundColor: 'rgba(246, 246, 246, 0.98)',
        width: '100%',
        position: 'absolute',
        paddingBottom: 40,
        bottom: 0,
    },
};


export default Home;
