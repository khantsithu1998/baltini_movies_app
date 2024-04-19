import React, { useEffect } from 'react'
import { SectionLayout } from '../layout/SectionLayout'
import { Grid } from '../layout/Grid'
import { MovieCard } from '../components/movies/MovieCard'
import { Movie } from '../types'

function MyListPage ({
  removeBookmark,
  bookmarkItem,
  myBookmarks,
  // isBookmarked,
  handleSearch,
  searchBookmark,
  filteredBookmarks
} : {
  removeBookmark : any,
  bookmarkItem : any,
  myBookmarks : any,
  // isBookmarked : any,
  handleSearch : any,
  searchBookmark : any,
  filteredBookmarks : any
}) {
  const hasBookmarks = myBookmarks?.length > 0

  useEffect(() => {
    console.log("filtered bookmarks : ", JSON.stringify(filteredBookmarks))
  },[filteredBookmarks])

  return (
    <SectionLayout
      inputHolder='Search for bookmarked movie or TV shows'
      name='mylist'
      handleSearch={handleSearch}
      searchBookmark={searchBookmark}
    >
      <Grid title='My List'>
        {hasBookmarks &&
          filteredBookmarks.map((movie : Movie) => (
            <MovieCard
              key={`${movie.imdbID}-card`}
              movie={movie}
              deleteItem={removeBookmark}
              saveItem={bookmarkItem}
            />
          ))}
      </Grid>
    </SectionLayout>
  )
}

export { MyListPage }
