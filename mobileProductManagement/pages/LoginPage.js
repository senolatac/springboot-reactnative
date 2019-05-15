import React, {Component} from 'react';
import {View, Image, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from '../styles/index.style';
import {Input, Button} from 'react-native-elements';
import UserService from '../services/user.service';
import User from '../models/user';

export default class LoginPage extends Component{

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      avatar: {uri: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png'},
      user: new User(),
      errorMessage: '',
      isError: false,
      loading: false,
      initial: true,
    }
  }

  async componentWillMount(){
    const data = await AsyncStorage.getItem('currentUser');
    if(data) {
      UserService.loginEmitter(data);
      this.props.navigation.navigate('MenuStack');
    }
    this.setState({
      initial: false
    });
  }

  handleChange(name, e){
    var {text} = e.nativeEvent;
    var user = this.state.user;
    user[name] = text;
    this.setState({
      user: user
    });
  }

  login() {
    const{user} = this.state;
    if(!(user.username && user.password)){
      this.setState({
        errorMessage: "All fields are required.",
        isError: true,
      });
      return;
    }

    this.setState({loading: true});
    UserService.login(user)
    .then(
      data => {
        setTimeout(()=> {
          this.props.navigation.navigate('MenuStack');
          this.setState({loading: false});
        }, 3000);
      },
      error => {
        this.setState({
          errorMessage: "Username or password is not valid.",
          loading: false
        });
      }
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    if(this.state.initial) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      );
    }else{
      return (
        <View style={styles.container}>
          {this.state.isError &&
            <Text style={styles.alertDanger}>
              <Text style={{fontWeight: '600'}}>Error! </Text>{this.state.errorMessage}
            </Text>
          }
          <View style={styles.form}>
            <Image resizeMode="cover" style={styles.logo} source={this.state.avatar}/>
            <Input placeholder="Username"
              leftIcon={{name:'person', color:'#a6a8a9'}}
              textContentType="username"
              value={this.state.user.username}
              onChange={(e)=> this.handleChange('username', e)}
              inputContainerStyle={styles.textInput}
              />
              <Input placeholder="Password"
                leftIcon={{name:'lock', color:'#a6a8a9'}}
                textContentType="password"
                value={this.state.user.password}
                onChange={(e)=> this.handleChange('password', e)}
                inputContainerStyle={styles.textInput}
               />
               <Button
                onPress={()=> this.login()}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                title="Sign In"
                disabled={this.state.loading}
               />
               <Text style={{alignSelf: 'center', color: '#a6a8a9', fontSize: 15}}>
                Don't have an account yet?
               </Text>
               <Button
                onPress={()=> navigate('Register')}
                buttonStyle={styles.subButton}
                titleStyle={styles.subButtonTitle}
                title="Crate an account!"
                type="clear"
               />
          </View>
        </View>
      );
    }
  }

}
