import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import MenuStack from './menu';
import AdminMenuStack from './menu.admin';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const EntryStack = createStackNavigator({
  Login: {screen: LoginPage},
  Register: {screen: RegisterPage},
},
{
  initialRouteName: 'Login'
});

export const RootStack = createStackNavigator(
  {
    EntryStack: {screen: EntryStack},
    MenuStack: {screen: MenuStack},
  },
  {
    headerMode: 'none',
    initialRouteName: 'EntryStack',
  }
);

export const RootAdminStack = createStackNavigator(
  {
    EntryStack: {screen: EntryStack},
    MenuStack: {screen: AdminMenuStack},
  },
  {
    headerMode: 'none',
    initialRouteName: 'MenuStack',
  }
);

const UserStack = createAppContainer(RootStack);
const AdminStack = createAppContainer(RootAdminStack);

export default class AppStack extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const{admin} = this.props;
    if(admin) {
      return (<AdminStack/>);
    }else{
      return (<UserStack/>);
    }
  }
}
