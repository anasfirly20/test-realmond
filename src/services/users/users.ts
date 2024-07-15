
import { AxiosResponse } from 'axios';
import api from '../api';
import { IGetUsersResponse } from './types';

export default class UsersApi {
  static async getUsers(): Promise<AxiosResponse<IGetUsersResponse[]>> {
    return await api.get('/users');
  }
}
