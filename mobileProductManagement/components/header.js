import React from 'react';
import {Icon, Header} from 'react-native-elements';
import UserService from '../services/user.service';

export default class CustomHeader extends React.Component {

  constructor(props){
    super(props);
  }

  logout() {
    UserService.logOut().then(
      data => {
        this.props.navigation.navigate('EntryStack');
      }
    );
  }

  render() {
    return (
      <Header
        leftComponent={
          <Icon name="menu" color="#fff" onPress={()=>this.props.navigation.toggleDrawer()}/>
        }
        centerComponent={{
          text: this.props.title,
          style: {color: "#fff", fontWeight: "bold"}
        }}
        rightComponent={
          <Icon name="exit-to-app" color="#fff" onPress={()=>this.logout()}/>
        }
      />
    );
  }
}
