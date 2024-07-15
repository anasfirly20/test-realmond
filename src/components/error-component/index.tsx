import Image from 'next/image';
import errorImage from '../../../public/error.svg';
import { Button } from '@nextui-org/react';

interface IProps {
  retry?: boolean;
}

export default function ErrorComponent({ retry }: IProps): JSX.Element {
  return (
    <section className="flex flex-col justify-center items-center gap-10 h-[70vh]">
      <Image
        src={errorImage}
        priority={true}
        width={300}
        height={300}
        alt="Error image"
      />
      <h3 className="text-center">
        An error has occurred, <br className="sm:hidden" /> please try again
        later.
      </h3>
      {retry ? (
        <Button onClick={() => window.location.reload()}>
          Click here to retry
        </Button>
      ) : null}
    </section>
  );
}
