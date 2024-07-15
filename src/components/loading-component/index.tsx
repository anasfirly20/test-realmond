import { Spinner } from '@nextui-org/react';

export default function LoadingComponent(): JSX.Element {
  return (
    <section className="h-[70vh] flex justify-center items-center">
      <Spinner size="lg" label="Loading..." />
    </section>
  );
}
