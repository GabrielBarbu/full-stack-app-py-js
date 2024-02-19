/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./App.css";

const List = ({ lists, updateList, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_list/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

  return (
    <div>
      <h2>Lists</h2>
      <table>
        <thead>
          <tr>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list) => (
            <tr key={list.id}>
              <td>{list.text}</td>
              <td>
                <button className="update" onClick={() => updateList(list)}>Update</button>
                <button className="delete" onClick={() => onDelete(list.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
