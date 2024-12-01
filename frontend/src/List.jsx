/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import "./App.css";

// Define the List component
const List = ({ lists, updateList, updateCallback }) => {
  // Function to handle delete operation
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      // Send a DELETE request to the server
      const response = await fetch(
        `http://127.0.0.1:5000/delete_list/${id}`,
        options
      );
      if (response.status === 200) {
        // If the delete operation is successful, update the list
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2>Lists</h2>
      <table>
        <thead>
          <tr>
            <th>Titles</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the lists array and render each list item */}
          {lists.map((list) => (
            <tr key={list.id}>
              <td>{list.title}</td>
              <td>
                {/* Button to update the list */}
                <button className="update" onClick={() => updateList(list)}>
                  Update
                </button>
                {/* Button to delete the list */}
                <button className="delete" onClick={() => onDelete(list.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
