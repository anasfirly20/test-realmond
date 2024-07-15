import UsersApi from '@/services/users/users';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';

export const useHomePage = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: UsersApi.getUsers,
    retry: 3,
  });

  const rowsPerPage = 5;
  const [page, setPage] = useState(1);

  const handleChangePage = ({ value }: { value: number }) => setPage(value);

  const totalPages =
    query?.data?.data && Math.ceil(query?.data?.data?.length / rowsPerPage);

  const usersData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return query?.data?.data?.slice(start, end);
  }, [page, query?.data?.data]);

  return { query, page, totalPages, handleChangePage, usersData };
};
