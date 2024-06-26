import React from "react";
import { SearchBar } from "../components/shared/SearchBar";
import { SearchBookmark } from "../components/shared/SearchBookmark";

function SectionLayout({
  children,
  inputHolder,
  name,
  handleSearch,
  searchBookmark,
  multiSearch,
  searchedValue,
}: {
  children?: any;
  inputHolder: any;
  name: any;
  handleSearch: any;
  searchBookmark: any;
  multiSearch?: any;
  searchedValue?: any;
}) {
  return (
    <main className="customWidth flex flex-col gap-6 lg:px-0 pb-6 items-start">
      <div className="flex w-full gap-6 items-center h-min">
        {name !== "mylist" ? (
          <SearchBar
            holder={inputHolder}
            name={name}
            multiSearch={multiSearch}
            searchedValue={searchedValue}
          />
        ) : (
          <SearchBookmark
            holder={inputHolder}
            handleSearch={handleSearch}
            searchBookmark={searchBookmark}
          />
        )}
      </div>
      <section className="w-full grid gap-6">{children}</section>
    </main>
  );
}
export { SectionLayout };
