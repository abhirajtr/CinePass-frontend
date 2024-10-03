import axios from "axios";

export const tmdbImageUriSecure = 'https://image.tmdb.org/t/p/w500';

const tmdbInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTczNDgwZmEyNTYyMWI3NjdhNThkZWFiNWJlYmM0ZCIsIm5iZiI6MTcyNzcwOTE5MC44MTE3OTYsInN1YiI6IjY2NTk5NjE1Yzk0MGNmYzVjZDc1MTk3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-oAneY1FiFSbR-Atvy2-DPvv1qIh9RmXPQHKAXl8LOY',
    },
});

export default tmdbInstance;