import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {styles} from '../styles/index.style';
import {ListItem} from 'react-native-elements';
import CustomHeader from '../components/header';
import AdminService from '../services/admin.service';

export default class AdminPage extends Component{
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: true,
      title: "User List"
    };
  }

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus', () =>{
          this.findAllUsers();
      }
    );
  }

  findAllUsers() {
    this.setState({loading: true});
    AdminService.setHeaders().then(
      ()=> {
        AdminService.findAllUsers().then(users => {
          this.setState({
            users: users.data,
            loading: false
          });
        });
      }
    );
  }

  componentWillUnmount(){
    this.willFocusSubscription.remove();
  }

  renderItem(itemUser) {
    const {item} = itemUser;
    return (
      <ListItem
        title={<Text style={styles.productTitle}>{item.name + ' (' + item.role + ')'}</Text>}
        subtitle={item.username}
        leftIcon={{name: 'person'}}
        onPress={()=>this.props.navigation.navigate('User', {userId:item.id, user: item})}
        chevron
      />
    );
  }

  render() {
    return (
      <View style={styles.softContainer}>
        <CustomHeader navigation={this.props.navigation} title={this.state.title}/>
        {!this.state.loading &&
          <FlatList
            data={this.state.users}
            renderItem={(item)=>this.renderItem(item)}
          />
        }
        {this.state.loading &&
          <View style={styles.form}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        }
      </View>
    );
  }


}
