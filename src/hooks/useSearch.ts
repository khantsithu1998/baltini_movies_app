import { useState, useMemo } from 'react'
import { debounceFunction } from '../utils/debounce'

function useSearch () {
  const [searchedValue, setSearchedValue] = useState('')
  const [query, setQuery] = useState('')

  function handleSearch (event : any) {
    event.preventDefault()
    const input = event.target.value.toLowerCase().trimStart()
    setSearchedValue(input)
    debounceQuery(input)
  }

  const debounceQuery = useMemo(function () {
    function memoQuery (query : string) {
      setQuery(query)
    }

    return debounceFunction(memoQuery, 350)
  }, [])

  return { handleSearch, searchedValue, setSearchedValue, query }
}

export { useSearch }
