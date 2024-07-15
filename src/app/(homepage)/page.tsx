'use client';

import { Input } from '@nextui-org/input';
import { Select, SelectItem, Spinner } from '@nextui-org/react';
import { useHomePage } from './functions';
import CardProfile from '@/components/profile-card';
import PaginationControls from '@/components/pagination-controls';
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';

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

export default function Home() {
  const {
    query,
    page,
    totalPages,
    handleChangePage,
    usersData,
    setSearchString,
  } = useHomePage();
  const { isLoading } = query;

  type TViewOptions = (typeof viewOptions)[number]['id'];

  const [view, setView] = useState<TViewOptions>(2);

  const tableColumns = [
    'NO',
    'FIRST NAME',
    'LAST NAME',
    'EMAIL',
    'PHONE NUMBER',
    'ADDRESS',
    'ZIP CODE',
  ];

  const viewMode: Record<TViewOptions, React.ReactNode> = {
    '1': (
      <>
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {usersData.length ? (
            usersData?.map((person) => {
              return (
                <CardProfile
                  key={person.id}
                  name={`${person.name.firstname} ${person.name.lastname}`}
                  email={person.email}
                  phone={person.phone}
                />
              );
            })
          ) : (
            <h1>NO DATA</h1>
          )}
        </section>
        <PaginationControls
          page={page}
          totalPages={totalPages as number}
          onChange={handleChangePage}
        />
      </>
    ),
    '2': (
        <Table aria-label="Example static collection table"
        bottomContent={
          <PaginationControls
          page={page}
          totalPages={totalPages as number}
          onChange={handleChangePage}
        />
        }
        >
          <TableHeader>
            {tableColumns?.map((column, index) => {
              return <TableColumn key={index}>{column}</TableColumn>;
            })}
          </TableHeader>
          {usersData?.length > 0 ? (
            <TableBody
              isLoading={isLoading}
              loadingContent={<Spinner color="success" label="Loading..." />}
            >
              {usersData?.map((user, index) => {
                const rowsPerPage = 5;
                const items_numbering = (page - 1) * rowsPerPage + index + 1;
                return (
                  <TableRow key={user.id}>
                    <TableCell>{items_numbering}</TableCell>
                    <TableCell>{user.name.firstname}</TableCell>
                    <TableCell>{user.name.lastname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{`${user.address.street}, ${user.address.city}`}</TableCell>
                    <TableCell>{user.address.zipcode}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody emptyContent={'No data to display.'}>{[]}</TableBody>
          )}
        </Table>
    ),
  };

  return (
    <section className="flex flex-col justify-center gap-5 max-sm:pb-normal">
      <Input
        placeholder="Search User..."
        isClearable
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Select
        items={viewOptions}
        aria-label="View mode"
        placeholder="Select view"
        defaultSelectedKeys={'1'}
        className="self-end w-[40%] md:w-[25%] lg:w-[15%]"
        onChange={(e) => setView(Number(e.target.value) as TViewOptions)}
      >
        {(option) => <SelectItem key={option.id}>{option.label}</SelectItem>}
      </Select>
      {viewMode[view]}
    </section>
  );
}
