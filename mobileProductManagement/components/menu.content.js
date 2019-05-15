import React, {PureComponent} from 'react';
import {DrawerItems} from 'react-navigation';
import {Text, View, ScrollView, Image} from 'react-native';
import {styles} from '../styles/index.style';

export default class DrawerContent extends PureComponent{

  render() {
    return (
      <View style={styles.softContainer}>
        <View style={styles.drawerContainer}>
          <Image source={require('../imgs/react.png')} style={styles.drawerImage}/>
          <Text style={styles.drawerText}>React Native</Text>
        </View>
        <ScrollView>
          <DrawerItems {...this.props}/>
        </ScrollView>
      </View>
    );
  }
}
