import { IconSearch } from '../../resources/svg/IconSearch'

function SearchBar ({ holder, name, multiSearch, searchedValue } : any) {
  return (
    <>
      <form action='' className='flex w-full'>
        <IconSearch />
        <input
          type='text'
          onChange={multiSearch}
          value={searchedValue}
          name={name}
          placeholder={holder}
          className='bg-black w-full form-input outline-none border-0 border-b-2 border-transparent focus:ring-0 focus:border-blue hover:cursor-pointer caret-red'
        />
      </form>
    </>
  )
}

export { SearchBar }
