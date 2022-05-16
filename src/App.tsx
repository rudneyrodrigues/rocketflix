import { useState } from 'react';
import toast from 'react-hot-toast';
import shuffleImg from './assets/shuffle.svg';
import { api, apiKey, apiUrlImg } from './utils/api';

interface FilmProps {
  id: number;
  title: string;
  description: string;
  poster: string;
}

export function App() {
  const [film, setFilm] = useState<FilmProps>({} as FilmProps)

  function handleSearchFilm() {
    toast.promise(
      api.get(`/popular?${apiKey}`).then(res => {
        const data = res.data.results[Math.floor(Math.random() * res.data.results.length)];

        const imgPoster = `${apiUrlImg}${data.poster_path}`;

        const film = {
          id: data.id,
          title: data.title,
          description: data.overview,
          poster: imgPoster
        }

        setFilm(film);
      }).catch(err => {
        console.log(err);
      }),
      {
        loading: 'Loading...',
        success: 'Success!',
        error: 'Error!',
      }
    );
  }

  return (
    <main className="flex flex-col items-center justify-center gap-8 bg-gradient-to-bl from-red-700 via-gray-900 to-blue-700 h-screen px-4">
      <div className='flex flex-col items-center gap-3'>
        <img
          src={shuffleImg}
          alt="Rocketflix"
          className='h-16'
        />
        <h1 className='font-sans font-bold text-4xl text-gray-100'>Don't know what to watch?</h1>
      </div>

      {film.id ? (
        <div className='flex items-center justify-center gap-8 w-full max-w-2xl h-80 max-h-80'>
          <img
            src={film.poster}
            alt={film.title}
            className='h-full rounded-md'
          />
          <div className='flex flex-col gap-4 h-full'>
            <h1 className='font-sans font-bold text-gray-100 text-xl'>{film.title}</h1>
            <p className='font-sans text-base text-gray-100'>{film.description}</p>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center gap-8 w-full max-w-2xl h-80'>
          <div className='bg-opacity-5 bg-gray-200 rounded-md h-80 w-5/12' />
          <div className='bg-opacity-5 bg-gray-200 rounded-md h-full w-full' />
        </div>
      )}

      <div className='flex flex-col items-center justify-center gap-6'>
        <button
          className='flex items-center justify-center gap-4 bg-gray-100 p-4 rounded-md border-gray-900 border-2 hover:bg-gray-300 transition-colors'
          onClick={handleSearchFilm}
        >
          <img
            src={shuffleImg}
            alt="Rocketflix"
            className='h-6'
          />
          <span className='font-bold font-sans'>Find movie</span>
        </button>
        <span className='font-sans text-sm text-gray-100 max-w-md text-center'>Click "Find Movie" and we'll show you some movie information for you to watch today.</span>
      </div>
    </main>
  )
}
