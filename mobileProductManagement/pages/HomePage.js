import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from '../styles/index.style';
import CustomHeader from '../components/header';
import AsyncStorage from '@react-native-community/async-storage';
import {Role} from '../models/role';
import User from '../models/user';

export default class HomePage extends Component{

  constructor(props){
    super(props);

    this.state = {
      currentUser: new User(),
      title: 'Home'
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('currentUser', (err, result)=> {
      if(result) {
        var u = JSON.parse(result);
        this.setState({
          currentUser: u,
          title: (u.role == Role.ADMIN ? 'Admin Panel':'User Panel')
        });
      }
    });
  }

  render() {
    return(
      <View style={styles.softContainer}>
        <CustomHeader navigation={this.props.navigation} title={this.state.title}/>
        <View style={[styles.container, styles.form]}>
          <Image source={require('../imgs/react.png')} style={styles.drawerImage}/>
          <Text>Welcome to react native app.</Text>
          <Text>Role: {this.state.currentUser.role}</Text>
          <Text>Name: {this.state.currentUser.name}</Text>
          <Text>Username: {this.state.currentUser.username}</Text>
        </View>
      </View>
    );
  }

}
