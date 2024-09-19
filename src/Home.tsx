import React, { useEffect, useRef } from "react";
import UserLayout from "./layouts/UserLayout";
import MovieCard from "./components/MovieCard";

const image = 'https://image.tmdb.org/t/p/w1280/sjC29cgm4qZAnpOJQbYKCxDCcra.jpg';
const movies = [
    {
        id: "1",
        title: 'Movie 1',
        poster: 'https://image.tmdb.org/t/p/w500/gUREuXCnJLVHsvKXDH9fgIcfM6e.jpg',
        infoUrl: '#',
        bookUrl: '#'
    },
    {
        id: "2",
        title: 'Movie 2',
        poster: 'https://image.tmdb.org/t/p/w500/jaUu9zHtbcFwrB5Y1DNYE09HMex.jpg',
        infoUrl: '#',
        bookUrl: '#'
    },
    {
        id: "3",
        title: 'Movie 3',
        poster: 'https://image.tmdb.org/t/p/w500/e6cCBe7DQOn9OFdFJ0eyVwSC8hR.jpg',
        infoUrl: '#',
        bookUrl: '#'
    },
    {
        id: "4",
        title: 'Movie 4',
        poster: 'https://image.tmdb.org/t/p/w500/hqnfqeCILvgKGWKOut5lVdxdeJh.jpg',
        infoUrl: '#',
        bookUrl: '#'
    },
    {
        id: "5",
        title: 'Movie 4',
        poster: 'https://image.tmdb.org/t/p/w500/5XJGvr8g9jkmN6KUIOQOj2iE6K4.jpg',
        infoUrl: '#',
        bookUrl: '#'
    },
    {
        id: "6",
        title: 'Movie 4',
        poster: 'https://image.tmdb.org/t/p/w500/1MJNcPZy46hIy2CmSqOeru0yr5C.jpg',
        infoUrl: '#',
        bookUrl: '#'
    },
    {
        id: "7",
        title: 'Movie 4',
        poster: 'https://image.tmdb.org/t/p/w500/1iWGGxHEwswZGvPSoMZlLFf0PNq.jpg',
        infoUrl: '#',
        bookUrl: '#'
    },
    {
        id: "8",
        title: 'Movie 4',
        poster: 'https://image.tmdb.org/t/p/w500/aOsPclgSiOqhndI2Xp2ksz2g9n6.jpg',
        infoUrl: '#',
        bookUrl: '#'
    },
    // Add more movies as needed
];

const Home: React.FC = () => {

    const nowShowingRef = useRef<HTMLDivElement>(null);
    const upcomingReleaseRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = (ref: React.RefObject<HTMLDivElement>) => (event: WheelEvent) => {
            if (ref.current) {
                event.preventDefault();
                ref.current.scrollLeft += event.deltaY;
            }
        };
        const nowShowingContainer = nowShowingRef.current;
        const upcomingReleaseContainer = upcomingReleaseRef.current;

        if (nowShowingContainer) {
            nowShowingContainer.addEventListener('wheel', handleScroll(nowShowingRef));
        }
        if (upcomingReleaseContainer) {
            upcomingReleaseContainer.addEventListener('wheel', handleScroll(upcomingReleaseRef));
        }
        return () => {
            if (nowShowingContainer) {
                nowShowingContainer.removeEventListener('wheel', handleScroll(nowShowingRef));
            }
            if (upcomingReleaseContainer) {
                upcomingReleaseContainer.removeEventListener('wheel', handleScroll(upcomingReleaseRef));
            }
        };
    }, [])
    return (
        <UserLayout>
            {/* Hero Section */}
            <section className="relative w-full h-screen">
                {/* Movie Banner Image */}
                <img
                    src={image}
                    alt="Movie Banner"
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black opacity-60"></div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center">
                    <div className="text-center md:text-left p-6 bg-opacity-70 rounded-lg max-w-3xl">
                        <h1 className="text-4xl font-bold text-text-950 mb-4">Afraid</h1>
                        <p className="text-lg text-text-950 mb-4">
                            Curtis Pike and his family are selected to test a new home device: a digital assistant called AIA. AIA observes the family's behaviors and begins to anticipate their needs. And she can – and will – make sure nothing – and no one – gets in her family's way.
                        </p>
                        <p className="text-md text-text-800 font-semibold mb-4">
                            Details: Horror | Science Fiction | Thriller, 2h 30m
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="bg-secondary-950 text-text-50 py-2 px-6 rounded-full font-semibold hover:bg-primary-dark transition duration-300"
                            >
                                Book Tickets Now
                            </a>
                            <a
                                href="#"
                                className="bg-accent-400 text-text-950 py-2 px-6 rounded-full font-semibold hover:bg-primary-dark transition duration-300"
                            >
                                More Info
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Now Showing Section */}
            <section className="py-16 px-4">
                <h2 className="text-3xl font-bold text-text-900  mb-8">Now Showing</h2>
                <div className="flex overflow-x-auto space-x-8 hover:cursor-pointer scrollbar-hide" ref={nowShowingRef}>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} poster={movie.poster} title={movie.title} />
                    ))}
                </div>
            </section>

            {/* Upcoming Releases */}
            <section className="py-16 px-4 mb-20">
                <h2 className="text-3xl font-bold text-text-900  mb-8">Upcoming Releases</h2>
                <div className="flex overflow-x-auto space-x-8 hover:cursor-pointer scrollbar-hide" ref={upcomingReleaseRef}>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} poster={movie.poster} title={movie.title} />
                    ))}
                </div>
            </section>

        </UserLayout>
    );
};

export default Home;
