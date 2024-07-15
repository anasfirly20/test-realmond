import PaginationControls from '@/components/pagination-controls';
import CardProfile from '@/components/profile-card';
import { IGetUsersResponse } from '@/services/users/types';
import React from 'react';

interface IProps {
  usersData: IGetUsersResponse[];
  page: number;
  totalPages: number;
  onChangePage: ({ value }: { value: number }) => void;
}

export default function CardView({
  usersData,
  page,
  totalPages,
  onChangePage,
}: IProps): JSX.Element {
  return (
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
      {usersData.length ? (
        <PaginationControls
          page={page}
          totalPages={totalPages as number}
          onChange={onChangePage}
        />
      ) : null}
    </>
  );
}
