'use client';

import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/react';
import { useHomePage } from './functions';
import TableView from './components/table-view';
import CardView from './components/card-view';
import ErrorComponent from '@/components/error-component';
import LoadingComponent from '@/components/loading-component';

export default function HomePage(): JSX.Element {
  const {
    query,
    page,
    totalPages,
    handleChangePage,
    usersData,
    handleSearch,
    view,
    handleChangeView,
    viewOptions,
  } = useHomePage();
  
  const { isLoading, isError } = query;

  type TViewOptions = (typeof viewOptions)[number]['id'];

  const viewMode: Record<TViewOptions, React.ReactNode> = {
    '1': (
      <CardView
        usersData={usersData}
        page={page}
        totalPages={totalPages}
        onChangePage={handleChangePage}
      />
    ),
    '2': (
      <TableView
        usersData={usersData}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onChangePage={handleChangePage}
      />
    ),
  };

  return (
    <section className="flex flex-col justify-center gap-5 max-sm:pb-normal">
      <Input placeholder="Search User..." isClearable onChange={handleSearch} />
      <Select
        items={viewOptions}
        placeholder="Select view"
        defaultSelectedKeys={'1'}
        className="self-end w-[40%] md:w-[25%] lg:w-[15%]"
        onChange={handleChangeView}
      >
        {(option) => <SelectItem key={option.id}>{option.label}</SelectItem>}
      </Select>
      {isLoading && <LoadingComponent />}
      {isError && <ErrorComponent retry />}
      {!isLoading && !isError && viewMode[view]}
    </section>
  );
}
