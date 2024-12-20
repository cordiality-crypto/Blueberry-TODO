import { useState } from "react";
import PropTypes from "prop-types";

export default function Task({ todo, onDelete, onEdit, onStatusChange }) {
    const [isChecked, setIsChecked] = useState(todo.status);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.task);

    function handleEdit() {
        if (isEditing) {
            onEdit(todo.id, editValue);
        }
        setIsEditing(!isEditing);
    }

    return (
        <div className="flex items-center p-2 mb-2 bg-[#1A2E45] rounded-full">
            <input
                type="checkbox"
                id={todo.id}
                checked={isChecked}
                onChange={() => {
                    const newStatus = !isChecked;
                    setIsChecked(newStatus);
                    onStatusChange(todo.id, newStatus); 
                }}
                className="hidden"
            />
            <label
                htmlFor={todo.id}
                className={`h-5 w-5 ml-1 flex items-center justify-center border-2 rounded-full cursor-pointer transition ${isChecked ? "bg-[#5A9BD6] border-[#5A9BD6]" : "border-[#5A9BD6]"
                    }`}
            >
                {isChecked && (
                    <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                    >
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                )}
            </label>

            {isEditing ? (
                <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-grow ml-2 p-1 bg-gray-700 rounded text-white"
                />
            ) : (
                <label
                    htmlFor={todo.id}
                    className={`flex-grow ml-2 text-text transition text-start ${isChecked ? "line-through text-gray-500" : ""
                        }`}
                >
                    {todo.task}
                </label>
            )}

            <button
                className="p-1 mr-1 hover:text-secondary transition"
                onClick={handleEdit}
            >
                {isEditing ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" /></svg> : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                )}
            </button>

            <button
                className="p-1 mr-1 hover:text-red-500 transition"
                onClick={() => onDelete(todo.id)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </button>
        </div>

    );
}

Task.propTypes = {
    todo: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
};
