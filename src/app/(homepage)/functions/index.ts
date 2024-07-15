import UsersApi from '@/services/users/users';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';

export const useHomePage = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: UsersApi.getUsers,
    retry: 3,
  });

  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState('');

  const handleChangePage = ({ value }: { value: number }) => setPage(value);

  const normalizePhoneNumber = ({ value }: { value: string }) => {
    return value?.replace(/[\+\-\s]/g, '').toLowerCase();
  };

  const filteredUsers = useMemo(() => {
    if (!query?.data?.data?.length) return [];

    const searchLower = normalizePhoneNumber({ value: searchString });

    return query?.data?.data?.filter((user) => {
      const fullName =
        `${user?.name.firstname} ${user?.name?.lastname}`.toLowerCase();
      const email = user?.email?.toLowerCase();
      const phone = normalizePhoneNumber({ value: user?.phone });
      return (
        fullName.includes(searchLower) ||
        email.includes(searchLower) ||
        phone.includes(searchLower)
      );
    });
  }, [searchString, query?.data?.data]);

  const totalPages = useMemo(() => {
    return filteredUsers && Math?.ceil(filteredUsers?.length / rowsPerPage);
  }, [filteredUsers]);

  useEffect(() => {
    if (totalPages === 1) setPage(1);
  }, [totalPages]);

  const usersData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredUsers?.slice(start, end);
  }, [page, filteredUsers]);

  return {
    query,
    page,
    totalPages,
    handleChangePage,
    usersData,
    setSearchString,
  };
};
