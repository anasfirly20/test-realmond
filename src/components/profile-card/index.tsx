import Image from 'next/image';
import emptyProfilePic from '../../../public/image/profile_pic.webp';

interface IProps {
  name: string;
  email: string;
  phone: string;
}

export default function CardProfile({
  name,
  email,
  phone,
}: IProps): JSX.Element {
  return (
    <div className="relative border rounded-md px-2 py-5 overflow-hidden lg:hover:scale-105 transition-transform duration-150">
      <div className="absolute top-0 left-0 bg-blue-200 h-24 w-full" />
      <div className="pt-5 w-full flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center items-center rounded-full size-28 bg-white z-10 p-5 relative overflow-hidden">
          <Image
            alt="empty profile picture"
            src={emptyProfilePic}
            layout="fill"
          />
        </div>
        <h1>{name}</h1>
        <p>{email}</p>
        <div className="px-6 py-2 border border-blue-300 rounded-md">
          <p className="border-blue-300">+ {phone}</p>
        </div>
      </div>
    </div>
  );
}
