import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {styles} from '../styles/index.style';
import {ListItem} from 'react-native-elements';
import CustomHeader from '../components/header';
import UserService from '../services/user.service';

export default class ProductPage extends Component{

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: true,
      title: "Product List",
    };
  }

  componentDidMount() {
    UserService.findAllProducts().then(products => {
      this.setState({
        products: products.data,
        loading: false
      });
    });
  }

  renderItem(itemProduct) {
    const {item} = itemProduct;
    return (
      <ListItem
        title={<Text style={styles.productTitle}>{item.name + " ($ "+ item.price +")"}</Text>}
        subtitle={item.explanation}
        leftIcon={{name: 'pin-drop'}}
        onPress={()=> this.props.navigation.navigate('Detail', {productId:item.id, product:item})}
        chevron
      />
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.softContainer}>
        <CustomHeader navigation={this.props.navigation} title={this.state.title}/>
        {!this.state.loading &&
          <FlatList
            data={this.state.products}
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
