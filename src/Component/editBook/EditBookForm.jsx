import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditBookMutation } from "../../features/api/apiSlice";
import Error from "../../ui/Error";
import Success from "../../ui/Success";

const EditBookForm = ({ book }) => {
  const [editBook, { isLoading, isError, isSuccess }] = useEditBookMutation();
  const {
    id,
    name: initialName,
    author: initialAuthor,
    rating: initialRating,
    price: initialPrice,
    thumbnail: initialThumbnail,
    featured: initialFeatured,
  } = book || {};
  const navigate = useNavigate();
  // all local state
  const [name, setName] = useState(initialName);
  const [author, setAuthor] = useState(initialAuthor);
  const [rating, setRating] = useState(initialRating);
  const [price, setPrice] = useState(initialPrice);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);
  const [featured, setFeatured] = useState(initialFeatured);

  const handleSubmit = (e) => {
    e.preventDefault();
    editBook({
      id,
      data: {
        name,
        author,
        rating,
        price,
        thumbnail,
        featured,
      },
    });
  };
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);
  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
          <form onSubmit={handleSubmit} className="book-form">
            <div className="space-y-2">
              <label htmlFor="lws-bookName">Book Name</label>
              <input
                required
                className="text-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="lws-bookName"
                name="name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lws-author">Author</label>
              <input
                required
                className="text-input"
                type="text"
                id="lws-author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                name="author"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lws-thumbnail">Image Url</label>
              <input
                required
                className="text-input"
                type="text"
                id="lws-thumbnail"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                name="thumbnail"
              />
            </div>

            <div className="grid grid-cols-2 gap-8 pb-4">
              <div className="space-y-2">
                <label htmlFor="lws-price">Price</label>
                <input
                  required
                  className="text-input"
                  type="number"
                  id="lws-price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  name="price"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lws-rating">Rating</label>
                <input
                  required
                  className="text-input"
                  type="number"
                  id="lws-rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  name="rating"
                  min="1"
                  max="5"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="lws-featured"
                type="checkbox"
                name="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="lws-featured" className="ml-2 text-sm">
                {" "}
                This is a featured book{" "}
              </label>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="submit"
              id="lws-submit"
            >
              Update Book
            </button>
          </form>
          {isError && <Error message="Can't update This book!" />}
          {isSuccess && <Success message="Successfully Update this book." />}
        </div>
      </div>
    </main>
  );
};

export default EditBookForm;
