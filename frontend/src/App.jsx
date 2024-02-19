/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import List from "./List";
import ListForm from "./ListForm";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState({});

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    const response = await fetch("http://127.0.0.1:5000/lists");
    const data = await response.json();
    setLists(data.lists);
    console.log(data.lists);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentList({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (list) => {
    if (isModalOpen) return;
    setCurrentList(list);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchLists();
  }

  return (
    <>
      <List lists={lists} updateList={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Create New List</button>
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
