import UsersApi from '@/services/users/users';
import { useQuery } from '@tanstack/react-query';

export const useHomePage = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: UsersApi.getUsers,
    retry: 3,
  });

  return { query };
};
