import api from '../api';
import { AxiosResponse } from 'axios';
import { IGetUserByIdResponse, IGetUsersResponse } from './types';

export default class UsersApi {
  static async getUsers(): Promise<AxiosResponse<IGetUsersResponse[]>> {
    return await api.get('/users');
  }

  static async getUserById({
    id,
  }: {
    id: number;
  }): Promise<AxiosResponse<IGetUserByIdResponse>> {
    return await api.get(`/users/${id}`);
  }
}
