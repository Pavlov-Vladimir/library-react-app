import axios from "axios";

export const fetchBooks = async () => {
  try {
    const response = await axios.get("https://localhost:5000/books");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
