export default function useGenres(selectedGenres){

    if(selectedGenres.length < 1) return "";

    const GenreIds = selectedGenres.map(g => g.id);

    // return GenreIds.reduce((acc,curr) => acc + ',' + curr)
    return GenreIds.join(',')

}