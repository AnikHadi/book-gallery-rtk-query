import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetBooksQuery } from "../../features/api/apiSlice";
import { filterByFeatured } from "../../features/filter/filterSlice";
import Error from "../../ui/Error";
import BookLoader from "../../ui/Loader/BookLoader";
import Book from "./Book";

const BookList = () => {
  const { data: books, isLoading, isError, error } = useGetBooksQuery();
  const { searchByFilter, featuredByFilter } = useSelector(
    (state) => state.filter
  );

  // filter by search input
  const filterBySearch = (book) =>
    book.name.toLowerCase().includes(searchByFilter);

  // filter by featured
  const filterByFeaturedShow = (book) => {
    switch (featuredByFilter) {
      case "all":
        return book;
      case "featured":
        return book.featured;

      default:
        return book;
    }
  };

  // conditionally check
  let contain = null;
  if (isLoading)
    contain = (
      <>
        <BookLoader />
        <BookLoader />
        <BookLoader />
      </>
    );
  if (!isLoading && isError) contain = <Error message={error.error} />;
  if (!isLoading && !isError && books.length === 0)
    contain = <h1>No book Found!</h1>;
  if (!isLoading && !isError && books.length > 0)
    contain = books
      .filter(filterBySearch)
      .filter(filterByFeaturedShow)
      .map((book) => <Book book={book} key={book.id} />);

  const dispatch = useDispatch();

  return (
    <div className="order-2 xl:-order-1">
      <div className="flex items-center justify-between mb-12">
        <h4 className="mt-2 text-xl font-bold">Book List</h4>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(filterByFeatured("all"))}
            className={`lws-filter-btn ${
              featuredByFilter === "all" && "active-filter"
            } `}
          >
            All
          </button>
          <button
            onClick={() => dispatch(filterByFeatured("featured"))}
            className={`lws-filter-btn ${
              featuredByFilter === "featured" && "active-filter"
            } `}
          >
            Featured
          </button>
        </div>
      </div>
      <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <!-- Card 1 --> */}
        {contain}
      </div>
    </div>
  );
};

export default BookList;
