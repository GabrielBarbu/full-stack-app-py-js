/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import List from "./List";
import ListForm from "./ListForm";

/**
 * Represents the main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState({});

  // Fetch lists from the server on component mount
  useEffect(() => {
    fetchLists();
  }, []);

  /**
   * Fetches the lists from the server.
   * @returns {Promise<void>} A promise that resolves when the lists are fetched.
   */
  const fetchLists = async () => {
    const response = await fetch("http://127.0.0.1:5000/lists");
    const data = await response.json();
    setLists(data.lists);
    console.log(data.lists);
  }

  /**
   * Closes the modal and resets the current list.
   * @returns {void}
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentList({});
  };

  /**
   * Opens the create modal if it is not already open.
   * @returns {void}
   */
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  /**
   * Opens the edit modal with the specified list.
   * @param {Object} list - The list to be edited.
   * @returns {void}
   */
  const openEditModal = (list) => {
    if (isModalOpen) return;
    setCurrentList(list);
    setIsModalOpen(true);
  };

  /**
   * Callback function to be called after updating a list.
   * Closes the modal and fetches the updated lists.
   * @returns {void}
   */
  const onUpdate = () => {
    closeModal();
    fetchLists();
  }

  return (
    <>
      <List lists={lists} updateList={openEditModal} updateCallback={onUpdate}/>
      <button className="create" onClick={openCreateModal}>Create New List</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ListForm existingList={currentList} updateCallback={onUpdate}/>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
