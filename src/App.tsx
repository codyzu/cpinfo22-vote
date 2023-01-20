import {lazy, Suspense} from 'react';
import Loading from './Loading';

const VoteApp = lazy(async () => import('./Vote'));

export default function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <VoteApp />
      </Suspense>
    </div>
  );
}
