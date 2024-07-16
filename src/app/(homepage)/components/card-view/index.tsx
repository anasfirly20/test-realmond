import CardProfile from '@/components/profile-card';
import { IGetUsersResponse } from '@/services/users/types';

interface IProps {
  usersData: IGetUsersResponse[];
}

export default function CardView({ usersData }: IProps): JSX.Element {
  return (
    <>
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {usersData.length ? (
          usersData?.map((person) => {
            return <CardProfile key={person.id} data={person} />;
          })
        ) : (
          <h1 className="text-[#72707a]">No data to display.</h1>
        )}
      </section>
    </>
  );
}
