import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import tmdbInstance from '../tmdbInstance';

const imageURI = process.env.TMDB_IMAGE_URI;

const SkeletonCard: FC = () => {
    return (
        <div className="bg-background-100 rounded-lg overflow-hidden shadow-lg animate-pulse">
            <div className="bg-gray-300 h-64"></div>
            <div className="p-4">
                <div className="h-6 bg-gray-300 mb-2"></div>
                <div className="h-4 bg-gray-300 mb-2"></div>
                <div className="h-4 bg-gray-300"></div>
            </div>
        </div>
    );
};

interface IMovie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    original_language: string;
    genre_ids: number[];
}

interface IGenre {
    id: number;
    name: string;
}

const AdminMovies: FC = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchGenres = useCallback(async () => {
        try {
            const { data } = await tmdbInstance.get<{ genres: IGenre[] }>('/genre/movie/list');
            setGenres(data.genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    }, []);

    const fetchMovies = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const { data } = await tmdbInstance.get<{ results: IMovie[]; total_pages: number }>('/discover/movie', {
                params: {
                    page: currentPage,
                    region: 'IN',
                    with_original_language: 'ml',
                    sort_by: 'release_date.desc',
                },
            });
            const moviesWithPosters = data.results.filter((movie) => movie.poster_path);
            setMovies((prevMovies) => [...prevMovies, ...moviesWithPosters]);
            setHasMore(currentPage < data.total_pages);
            setCurrentPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    }, [currentPage, loading, hasMore]);

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                fetchMovies();
            }
        });

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [fetchMovies, hasMore, loading]);

    useEffect(() => {
        fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getMovieGenres = (genreIds: number[]): string => {
        const genreNames = genreIds.map((id) => {
            const genre = genres.find((g) => g.id === id);
            return genre ? genre.name : '';
        });
        return genreNames.filter(Boolean).join(', ');
    };

    return (
        <div className='p-4'>
            <h1 className='font-bold text-2xl mb-4'>Movies</h1>

            <div className='h-[85vh] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-thumb-rounded-full scrollbar-track-scrollbar-bg'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                    {movies.map((m) => (
                        <motion.div
                            key={m.id}
                            className='bg-background-100 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer flex flex-col'
                        >
                            <img
                                src={imageURI+ '/w500' + m.poster_path}
                                alt={m.title}
                                className='w-full h-64 object-cover'
                            />
                            <div className='p-4'>
                                <h2 className='text-white text-xl font-bold h-12 overflow-hidden text-ellipsis'>{m.title}</h2>
                                <div className='mt-2 text-gray-400 text-sm'>
                                    <p>{m.release_date}</p>
                                    <p>{m.original_language}</p>
                                </div>
                                <p className='text-gray-300 mt-2 text-sm'>{getMovieGenres(m.genre_ids)}</p>
                                <button className='bg-accent-500 w-full px-4 py-2 mt-2 text-text-950 rounded hover:bg-accent-600 transition duration-300'>
                                    Add
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {/* Show skeleton cards if loading */}
                    {loading && (
                        [...Array(4)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    )}
                </div>

                {hasMore && <div ref={observerRef} className="h-10"></div>}
            </div>
        </div>
    );
};

export default AdminMovies;
