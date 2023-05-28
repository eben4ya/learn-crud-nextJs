"use client";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [modalOpenDeleteAll, setModalOpenDeleteAll] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");
  const [taskToEdit, setTaskToEdit] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [todos, setTodos] = useState([]);

  const handleSubmitNewTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, { id: Date.now(), newTaskValue }]);
    setNewTaskValue("");
    setModalOpen(false);
  };

  const handleSubmitEditTodo = (id, e) => {
    e.preventDefault();
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, newTaskValue: taskToEdit };
        }
        return todo;
      })
    );
    setTaskToEdit("");
    setEditTodoId(null);
    setModalOpenEdit(false);
  };

  const handleDeleteTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setModalOpenDelete(false);
  };

  const handleDeleteAllTasks = () => {
    setTodos([]);
    setModalOpenDeleteAll(false);
  };

  const handleEditClick = (id, task) => {
    setTaskToEdit(task);
    setEditTodoId(id);
    setModalOpenEdit(true);
  };

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary w-full"
        >
          Add New Task <AiOutlinePlus className="ml-2" size={18} />
        </button>
        {/* Modal Add Task*/}
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
          <div className="modal-box relative">
            <label
              onClick={() => setModalOpen(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            <form onSubmit={handleSubmitNewTodo}>
              <h3 className="font-bold text-lg">Add New Task</h3>
              <div className="modal-action">
                <input
                  value={newTaskValue}
                  id="newTaskValue"
                  onChange={(e) => setNewTaskValue(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* End of Modal Add Task */}
      </div>
      {/* Table */}
      {todos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Tasks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td className="w-full">{todo.newTaskValue}</td>
                  <td className="flex gap-5">
                    <FiEdit
                      onClick={() =>
                        handleEditClick(todo.id, todo.newTaskValue)
                      }
                      cursor="pointer"
                      className="text-blue-500"
                      size={25}
                    />
                    {/* Modal Edit */}
                    <div
                      className={`modal ${
                        modalOpenEdit && editTodoId === todo.id
                          ? "modal-open"
                          : ""
                      }`}
                    >
                      <div className="modal-box relative">
                        <label
                          onClick={() => {
                            setModalOpenEdit(false);
                            setEditTodoId(null);
                          }}
                          className="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>
                        <form
                          onSubmit={(e) => handleSubmitEditTodo(todo.id, e)}
                        >
                          <h3 className="font-bold text-lg">Edit Task</h3>
                          <div className="modal-action">
                            <input
                              value={taskToEdit}
                              onChange={(e) => setTaskToEdit(e.target.value)}
                              type="text"
                              placeholder="Type here"
                              className="input input-bordered w-full"
                            />
                            <button type="submit" className="btn">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* End of Modal Edit*/}
                    <FiTrash2
                      onClick={() => setModalOpenDelete(todo.id)}
                      cursor="pointer"
                      className="text-red-500"
                      size={25}
                    />
                    {/* Modal Delete*/}
                    <div
                      className={`modal ${
                        modalOpenDelete === todo.id ? "modal-open" : ""
                      }`}
                    >
                      <div className="modal-box relative">
                        <label
                          onClick={() => setModalOpenDelete(false)}
                          className="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>
                        <h3 className="text-lg">
                          Are You Sure You Want to Delete this Task?
                        </h3>
                        <div className="modal-action">
                          <button
                            onClick={() => handleDeleteTask(todo.id)}
                            className="btn"
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* End of Modal Delete */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {todos.length === 0 && <p className="text-center">No tasks available.</p>}
      {/* End of Table */}
      <div>
        <div className="text-center">
          {todos.length > 0 && (
            <button
              onClick={() => setModalOpenDeleteAll(true)}
              className="btn bg-red-400"
            >
              Delete All
            </button>
          )}
        </div>

        {/* Modal Delete All */}
        <div className={`modal ${modalOpenDeleteAll ? "modal-open" : ""}`}>
          <div className="modal-box relative">
            <label
              onClick={() => setModalOpenDeleteAll(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg">
              Are You Sure You Want to Delete All Tasks?
            </h3>
            <div className="modal-action">
              <button onClick={handleDeleteAllTasks} className="btn">
                Yes
              </button>
            </div>
          </div>
        </div>
        {/* End of Modal Delete All */}
      </div>
    </main>
  );
}
