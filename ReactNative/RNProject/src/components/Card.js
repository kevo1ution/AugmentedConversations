import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'native-base';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
        <View style={styles.textContainer}>
          <Text style={styles.titleStyle}>{props.name}</Text>
          {props.needs ? <Text style={styles.keyWord}>Wants your {props.needs}</Text>: null}
          {props.mission ? <Text style={styles.bodyTextStyle}>{props.mission}</Text> : null}
          {props.address ? <Text style={styles.bodyTextStyle}>{props.address}</Text> : null}
          {props.website ? <Text style={styles.bodyTextStyle}>{props.website}</Text> : null}
          {props.email ? <Text style={styles.bodyTextStyle}>{props.email}</Text> : null}
        </View>
        <View style={styles.buttonsContainer}>
          <Icon type='FontAwesome' name='phone' style={styles.phone}/>
          <Text style={{fontSize: 12, alignSelf: 'center', color: '#FF7C93'}}>CALL</Text>
        </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  textContainer: {
    padding: 10,
    //borderWidth: 2,
    //borderColor: 'blue',
    width: 300,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bodyTextStyle: {
    fontSize: 12,
    color: '#828282',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    //borderWidth: 2,
    //borderColor: 'red',
    position: 'absolute',
    top: 0,
    bottom: 0,
    margin: 'auto',
    right: 23,
  },
  keyWord: {
    color: '#FF7C93',
    fontWeight: 'bold',
    fontSize: 12
  },
  phone: {
    alignSelf: 'center',
    color: '#FF7C93',
    fontSize: 35,
  },
};

export { Card };
