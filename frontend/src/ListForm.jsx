/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import { useState } from "react";
import "./App.css";

const ListForm = ({ existingList = {}, updateCallback }) => {
    const [text, setText] = useState(existingList.text || "");

    const updating = Object.entries(existingList).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            text
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_list/${existingList.id}` : "create_list")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="text">Text:</label>
                <input
                    type="text"
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <button className="submit" type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default ListForm