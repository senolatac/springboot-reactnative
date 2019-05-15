import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import {styles} from '../styles/index.style';
import {Input, Button} from 'react-native-elements';
import UserService from '../services/user.service';
import User from '../models/user';

export default class RegisterPage extends Component{

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      avatar: {uri: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png'},
      user: new User(),
      errorMessage: '',
      loading: false,
      isError: false,
    }
  }

  handleChange(name, e) {
    var {text} = e.nativeEvent;
    var user = this.state.user;
    user[name] = text;
    this.setState({
      user: user
    });
  }

  register() {
    const {user} = this.state;
    if(!(user.username && user.password)){
      this.setState({
        errorMessage: 'All fields are required.',
        isError: true
      });
      return;
    }

    this.setState({loading: true, isError: false});
    UserService.register(user)
    .then(
      data => {
        this.props.navigation.navigate('Login');
      },
      error => {
        if(error.response.status === 409) {
          this.setState({
            errorMessage: "Username is not available",
            loading: false,
            isError: true,
          });
        }else{
          this.setState({
            errorMessage: "Unexpected error occurred.",
            loading: false,
            isError: true,
          });
        }
      }
    );
  }

  render() {
    const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          {this.state.isError &&
            <Text style={styles.alertDanger}>
              <Text style={{fontWeight: '600'}}>Error! </Text>{this.state.errorMessage}
            </Text>
          }
          <View style={styles.form}>
            <Image resizeMode="cover" style={styles.logo} source={this.state.avatar}/>
            <Input placeholder="Full Name"
              leftIcon={{name:'person-pin-circle', color:'#a6a8a9'}}
              textContentType="name"
              value={this.state.user.name}
              onChange={(e)=> this.handleChange('name', e)}
              inputContainerStyle={styles.textInput}
              />
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
                onPress={()=> this.register()}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                title="Sign Up"
                disabled={this.state.loading}
               />
               <Text style={{alignSelf: 'center', color: '#a6a8a9', fontSize: 15}}>
                Do you already have an account?
               </Text>
               <Button
                onPress={()=> navigate('Login')}
                buttonStyle={styles.subButton}
                titleStyle={styles.subButtonTitle}
                title="I have an account!"
                type="clear"
               />
          </View>
        </View>
      );
    }

}
