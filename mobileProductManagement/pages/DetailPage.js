import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from '../styles/index.style';
import {Header, Icon, Button} from 'react-native-elements';
import UserService from '../services/user.service';
import Transaction from '../models/transaction';
import User from '../models/user';
import AsyncStorage from '@react-native-community/async-storage';

export default class DetailPage extends Component{
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      productId: this.props.navigation.getParam('productId', '0'),
      product: this.props.navigation.getParam('product', '0'),
      errorMessage: '',
      infoMessage: '',
      currentUser: new User(),
      isError: false,
      isSucceed: false,
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('currentUser', (err, result)=> {
      this.setState({
        currentUser: JSON.parse(result)
      });
    });
  }

  purchaseProduct() {
    if(!this.state.currentUser){
      this.setState({errorMessage: "You should sign in to purchase a product"});
      return;
    }

    var transaction = new Transaction(this.state.currentUser, this.state.product);
    this.setState({loading: true});
    UserService.purchaseProduct(transaction).then(data => {
      this.setState({
        infoMessage: "Mission is completed.",
        isSucceed: true,
        loading: false
      });
    },
    error => {
      this.setState({
        errorMessage: "Unexpected error occurred.",
        isError: true,
        loading: false
      });
    }
  );
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon name="arrow-back" color="#fff"
            onPress={()=>this.props.navigation.goBack()}/>
          }
          centerComponent={{
            text: '$ ' + this.state.product.price,
            style: {color: '#fff'}
          }}
          rightComponent={
            <Icon name="home" color="#fff"
            onPress={()=>this.props.navigation.navigate('Home')}/>
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
          <Text style={styles.detailTitle}>
            {this.state.product.name}
          </Text>
          <Image
            resizeMode="cover"
            style={styles.productLogo}
            source={require('../imgs/product.jpg')}
          />
          <Text style={{marginBottom: 10}}>
          {this.state.product.explanation}
          </Text>
          <Button
            onPress={()=>this.purchaseProduct()}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            disabled={this.state.loading}
            title="Purchase Now!"
          />
        </View>
      </View>
    );
  }

}
