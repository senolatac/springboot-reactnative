import React, {Component} from 'react';
import AppStack from './components/router';
import {StatusBar} from 'react-native';
import UserService from './services/user.service';
import {Role} from './models/role';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false,
    };
  }

  componentWillMount() {
    this.listener = UserService.emitter.addListener('onLogin', (arg)=>{
      var data = JSON.parse(arg.user);
      this.setState({
        currentUser: data,
        isAdmin: data && data.role === Role.ADMIN
      });
    });
  }

  componentWillUnmount(){
    this.listener.remove();
  }

  componentDidMount() {
    StatusBar.setHidden(true, 'none');
  }

  render() {
    return (
      <AppStack admin={this.state.isAdmin}/>
    );
  }
}
