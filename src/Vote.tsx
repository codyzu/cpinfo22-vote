import {useEffect, useState} from 'react';
import cx from 'clsx';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  type User,
} from 'firebase/auth';
import app from './firebase';
import emailList from './email.json';
import Loading from './Loading';

enum Vote {
  exam = 'exam',
  hackathon = 'hackathon',
}

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const emailRegExps = emailList.emails.map(
  (email) => new RegExp(email.replace('.', '\\.')),
);

function VoteApp() {
  const [user, setUser] = useState<User | undefined>();
  useEffect(() =>
    onAuthStateChanged(auth, (nextUser) => {
      console.log('user', nextUser);
      setUser(nextUser ?? undefined);
    }),
  );

  const [votesLoaded, setVotesLoaded] = useState<boolean>(false);
  const [votes, setVotes] = useState<Vote[]>([]);
  useEffect(
    () =>
      onSnapshot(query(collection(db, 'votes')), (querySnapshot) => {
        setVotesLoaded(true);
        console.log('snap');
        setVotes(
          querySnapshot.docs.map((snapshot) => snapshot.data().vote as Vote),
        );
      }),
    [],
  );

  const exam = votes.filter((vote) => vote === Vote.exam).length;
  const hackathon = votes.filter((vote) => vote === Vote.hackathon).length;
  const total = exam + hackathon;
  const examPercent = Math.round(total > 0 ? (exam / total) * 100 : 0);
  const hackathonPercent = Math.round(
    total > 0 ? (hackathon / total) * 100 : 0,
  );

  console.log({exam, hackathon, total, examPercent, hackathonPercent});

  const canVote = Boolean(
    user?.email && emailRegExps.some((regExp) => regExp.test(user.email!)),
  );

  return (
    <div className="p-2 gap-8 w-full max-w-screen-xl mx-auto font-sans items-center">
      {!votesLoaded && <Loading />}
      <button
        type="button"
        className={cx(
          user ? 'btn-light text-black' : 'btn-blue',
          'self-end flex flex-row items-center gap-2',
        )}
        onClick={
          user
            ? async () => signOut(auth)
            : async () => signInWithRedirect(auth, provider)
        }
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            referrerPolicy="no-referrer"
            className="rounded h-8 w-8"
          />
        ) : (
          <div className="h-8 w-8 i-lucide-user" />
        )}
        <div>{user ? 'Sign Out' : 'Sign In'}</div>
      </button>
      <div className="w-full bg-gray-500 rounded-lg h-pb dark:bg-gray-700 flex-row text-white shadow">
        <div
          className={cx(
            'pb-amber items-start rounded-l-lg',
            `w-[${examPercent}%]`,
            examPercent === 100 && 'rounded-r-lg',
          )}
        >
          <div
            className={cx(
              'px-2 whitespace-nowrap z-10 transition-all',
              exam > hackathon && 'font-bold text-xl',
              exam === 0 && 'opacity-0',
            )}
          >
            Exam {exam}
          </div>
        </div>
        <div
          className={cx(
            'pb-emerald rounded-r-lg items-end',
            `w-[${hackathonPercent}%]`,
            hackathonPercent === 100 && 'rounded-l-lg',
          )}
        >
          <div
            className={cx(
              'px-2 whitespace-nowrap z-10 transition-all',
              hackathon > exam && 'font-bold text-xl',
              hackathon === 0 && 'opacity-0',
            )}
          >
            {hackathon} Hackathon
          </div>
        </div>
      </div>
      <div className="flex-row self-stretch">
        <div className="flex-grow-1 items-center">
          <div>Exam</div>
          <div>
            <button
              type="button"
              className="btn-amber"
              onClick={() => {
                console.log('VOTE!');
                void setDoc(doc(db, 'votes', user!.email!), {
                  vote: Vote.exam,
                  email: user!.email,
                });
              }}
              disabled={!canVote}
            >
              Exam
            </button>
          </div>
        </div>
        <div className="flex-grow-1 items-center">
          <div>Hackathon</div>
          <div>
            <button
              type="button"
              className="btn-emerald"
              onClick={() => {
                void setDoc(doc(db, 'votes', user!.email!), {
                  vote: Vote.hackathon,
                  email: user!.email,
                });
              }}
              disabled={!canVote}
            >
              Hackathon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoteApp;