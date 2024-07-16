import UsersApi from '@/services/users/users';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';

const viewOptions = [
  {
    id: 1,
    label: 'Card',
  },
  {
    id: 2,
    label: 'Table',
  },
] as const;

export const useHomePage = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: UsersApi.getUsers,
    retry: 3,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '3';

  const rowsPerPage = 3;
  const [searchString, setSearchString] = useState<string>('');

  const handleClearSearch = () => setSearchString('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchString(e.target.value);

  const handleChangePage = ({ value }: { value: number }) => {
    router.push(`/?page=${value ?? 1}&per_page=${per_page}`);
  };

  const filteredUsers = useMemo(() => {
    if (!query?.data?.data?.length) return [];

    return query?.data?.data?.filter((user) => {
      const fullName =
        `${user?.name.firstname} ${user?.name?.lastname}`.toLowerCase();
      const email = user?.email?.toLowerCase();
      const phone = user?.phone?.toLowerCase();
      const searchLower = searchString?.toLowerCase();
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

  const usersData = useMemo(() => {
    const start = (+page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredUsers?.slice(start, end);
  }, [page, filteredUsers]);

  type TViewOptions = (typeof viewOptions)[number]['id'];

  const [view, setView] = useState<TViewOptions>(1);
  const handleChangeView = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setView(Number(e.target.value) as TViewOptions);
  };

  return {
    query,
    page,
    totalPages,
    handleChangePage,
    usersData,
    view,
    handleChangeView,
    handleSearch,
    viewOptions,
    handleClearSearch,
  };
};
