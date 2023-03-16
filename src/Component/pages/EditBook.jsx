import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../features/api/apiSlice";
import Error from "../../ui/Error";
import EditBookForm from "../editBook/EditBookForm";

const EditBook = () => {
  const { bookId } = useParams();
  const { data: book, isLoading, isError } = useGetBookQuery(bookId);

  // conditionally render
  let contain = null;
  if (isLoading) contain = <div>Loading...</div>;
  if (!isLoading && isError)
    contain = <Error message="Can't find any book in this Book id!" />;
  if (!isLoading && !isError && book?.id)
    contain = <EditBookForm book={book} />;

  return contain;
};

export default EditBook;
