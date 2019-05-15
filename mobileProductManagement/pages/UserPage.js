import React, {Component} from 'react';
import {View, Text, Image, Alert, Switch} from 'react-native';
import {styles} from '../styles/index.style';
import {Header, Icon, Button, Input} from 'react-native-elements';
import AdminService from '../services/admin.service';
import {Role} from '../models/role';

export default class UserPage extends Component{

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      avatar: {uri: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png'},
      userId: this.props.navigation.getParam('userId', '0'),
      user: this.props.navigation.getParam('user',''),
      errorMessage: '',
      infoMessage: '',
      isError: false,
      isSucceed: false,
      loading: false,
      isAdmin: false
    };
  }

  componentDidMount() {
    const {user} = this.state;
    if(user.role === Role.ADMIN) {
      this.setState({
        isAdmin: true
      });
    }
  }

  handleChange(name, e){
    var {text} = e.nativeEvent;
    var user = this.state.user;
    user[name] = text;
    this.setState({
      user: user
    });
  }

  changeRole(value) {
    var user = this.state.user;
    user.role = (value ? Role.ADMIN: Role.USER);
    this.setState({
      isAdmin: value,
      user: user
    });
  }

  updateUser() {
    const {user} = this.state;
    this.setState({loading: true});
    AdminService.updateUser(user).then(data => {
      this.setState({
        infoMessage: "Mission is completed.",
        isSucceed: true,
        loading: false
      });
    },error => {
      this.setState({
        errorMessage: "Unexpected error occurred.",
        isError: true,
        loading: false
      });
    });
  }

  showDeleteConfirmation() {
    Alert.alert(
      'Confirmation',
      'Are you sure to delete user?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed.'),
          style: 'cancel',
        },
        {
          text: "I'm sure",
          onPress: () => this.deleteUser(),
        },
      ],
      {cancelable: false},
    );
  }

  deleteUser() {
    const {user} = this.state;
    AdminService.deleteUser(user).then(data => {
      this.setState({
        infoMessage: "Mission is completed.",
        isSucceed: true,
        loading: false
      });
      this.props.navigation.goBack();
    },error => {
      this.setState({
        errorMessage: "Unexpected error occurred.",
        isError: true,
        loading: false
      });
    });
  }

  render() {
    return(
      <View style={styles.softContainer}>
      <Header
        leftComponent={
          <Icon
            name="arrow-back"
            color="#fff"
            onPress={()=> this.props.navigation.goBack()}
          />
        }
        centerComponent={{
          text: this.state.user.name,
          style: {color: '#fff'}
        }}
        rightComponent={
          <Icon
            name="delete"
            color="#fff"
            onPress={()=>this.showDeleteConfirmation()}
          />
        }
      />
      <View style={styles.container}>
        {this.state.isError &&
          <Text style={styles.alertDanger}>
            <Text style={{fontWeight: '600'}}>Error! </Text>{this.state.errorMessage}
          </Text>
        }
        {this.state.isSucceed &&
          <Text style={styles.alertSuccess}>
            <Text style={{fontWeight: '600'}}>Successfull! </Text>{this.state.infoMessage}
          </Text>
        }
        <View style={styles.form}>
          <Image
            resizeMode="cover"
            style={styles.logo}
            source={this.state.avatar}
          />
          <Input
            placeholder="Full Name"
            label="Full Name"
            value={this.state.user.name}
            leftIcon={{name: 'person-pin-circle', color:'gray'}}
            textContentType="name"
            onChange={(e)=>this.handleChange('name',e)}
            inputContainerStyle={styles.textInput}
          />
          <Input
            placeholder="Username"
            label="Username"
            value={this.state.user.username}
            leftIcon={{name: 'person', color:'gray'}}
            textContentType="username"
            onChange={(e)=>this.handleChange('username',e)}
            inputContainerStyle={styles.textInput}
          />
          <View style={styles.leftAlign}>
            <Text>Is Admin?</Text>
            <Switch onValueChange={(value)=> this.changeRole(value)} value={this.state.isAdmin}/>
          </View>
          <Button
            onPress={()=>this.updateUser()}
            disabled={this.state.loading}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title="Save Changes"
          />
        </View>
      </View>
      </View>
    );
  }

}
