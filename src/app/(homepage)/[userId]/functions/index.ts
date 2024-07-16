import UsersApi from '@/services/users/users';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  userId: string;
}

export const useUserDetailPage = ({ userId }: IProps) => {
  const query = useQuery({
    queryKey: ['users', userId],
    queryFn: () => UsersApi.getUserById({ id: +userId }),
  });

  return {
    query,
  };
};
