/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import { useState } from "react";
import "./App.css";

// Define a functional component called ListForm
const ListForm = ({ existingList = {}, updateCallback }) => {
  const [text, setText] = useState(existingList.text || "");
  const [title, setTitle] = useState(existingList.title || "");

  const updating = Object.entries(existingList).length !== 0;

  // Define an async function called onSubmit to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      text,
      title,
    };
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_list/${existingList.id}` : "create_list");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };

  // Render the form component
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="text">Text:</label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button className="submit" type="submit">
        {updating ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default ListForm;
