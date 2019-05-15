import axios from 'react-native-axios';
import UserService from './user.service';

const API_URL = 'http://192.168.0.11:8080/api/admin/';

class AdminService {

  async setHeaders() {
    const user = await UserService.currentUser;
    this.headers = {
      'Content-Type':'application/json',
      'authorization':'Bearer ' + (user ? user.token: '')
    };
  }

  updateUser(user) {
    return axios.put(API_URL + "user-update", JSON.stringify(user), {headers: this.headers});
  }

  deleteUser(user) {
    return axios.post(API_URL + "user-delete", JSON.stringify(user), {headers: this.headers});
  }

  findAllUsers() {
    return axios.get(API_URL + "user-all", {headers: this.headers});
  }

}

export default new AdminService();
