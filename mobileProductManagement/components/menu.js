import React from 'react';
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';
import {Icon} from 'react-native-elements';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import DetailPage from '../pages/DetailPage';
import DrawerContent from './menu.content';

const ListStack = createStackNavigator({
  Product: {screen: ProductPage},
  Detail: {screen: DetailPage},
},
{
  initialRouteName: 'Product'
});

const Menu = createDrawerNavigator(
  {
    "Home": {
      screen: HomePage,
      navigationOptions: ({navigation}) => ({
        drawerIcon: ({tintColor}) => (
          <Icon name ="home" color={tintColor}/>
        ),
      }),
    },
    "Product": {
      screen: ListStack,
      navigationOptions: ({navigation}) => ({
        drawerIcon: ({tintColor}) => (
          <Icon name="local-grocery-store" color={tintColor}/>
        ),
      }),
    }
  },
  {
    contentComponent: DrawerContent,
    drawerWidth: 300,
    drawerPosition: 'left',
    initialRouteName: 'Home',
  }
);

const MenuStack = createAppContainer(Menu);
export default MenuStack;
