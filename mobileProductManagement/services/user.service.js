import axios from 'react-native-axios';
import {BehaviorSubject} from 'rxjs';
import AsyncStorage from '@react-native-community/async-storage';
import {decode as atob, encode as btoa} from 'base-64';
import EventEmitter from 'EventEmitter';

const API_URL = 'http://192.168.0.11:8080/api/user/';
var currentUserSubject = new BehaviorSubject(null);

const emitter = new EventEmitter();

class UserService {
  constructor(){
    AsyncStorage.getItem('currentUser', (err, result)=> {
      if(result) {
        currentUserSubject = new BehaviorSubject(JSON.parse(result));
      }
    });    
  }

  get currentUser(){
    return currentUserSubject.value;
  }

  get emitter() {
    return emitter;
  }

  loginEmitter(data) {
    emitter.emit('onLogin', {user: data});
  }

  login(user) {
    const headers = {
      authorization: 'Basic ' + btoa(user.username + ':' + user.password)
    };

    return axios.get(API_URL + 'login', {headers: headers})
    .then(response => {
      AsyncStorage.setItem('currentUser', JSON.stringify(response.data));
      this.loginEmitter(JSON.stringify(response.data));
      currentUserSubject.next(response.data);
    });
  }

  logOut() {
    return axios.post(API_URL + "logout", {})
    .then(response => {
      AsyncStorage.removeItem('currentUser');
      currentUserSubject.next(null);
    });
  }

  register(user) {
    return axios.post(API_URL + 'registration', JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findAllProducts() {
    return axios.get(API_URL + "products",
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  purchaseProduct(transaction) {
    return axios.post(API_URL + "purchase", JSON.stringify(transaction),
   {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

}

export default new UserService();
