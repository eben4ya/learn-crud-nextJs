"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Home() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(newTaskValue);

  const handleSubmitNewTodo = (e) => {
    e.preventDefault();

    setNewTaskValue("");

    setModalOpen(false);

    router.refresh();
  };

  const handleSubmitEditTodo = () => {
    e.preventDefault();

    // setTaskToEdit("");
    // biar saat diedit tulisannya engga ilang

    setModalOpenEdit(false);

    router.refresh();
  };

  const handleDeleteTask = () => {
    setModalOpenDelete(false);

    router.refresh();
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
        {/* Modal */}
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
                  onChange={(e) => setNewTaskValue(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn ">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* End of Modal */}
      </div>
      {/* Table */}
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
            {/* row 1 */}
            <tr>
              <td className="w-full">Cy Ganderton</td>
              <td className="flex gap-5">
                <FiEdit
                  onClick={() => setModalOpenEdit(true)}
                  cursor="pointer"
                  className="text-blue-500"
                  size={25}
                />
                {/* Modal */}
                <div className={`modal ${modalOpenEdit ? "modal-open" : ""}`}>
                  <div className="modal-box relative">
                    <label
                      onClick={() => setModalOpenEdit(false)}
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    <form onSubmit={handleSubmitEditTodo}>
                      <h3 className="font-bold text-lg">Edit Task</h3>
                      <div className="modal-action">
                        <input
                          value={taskToEdit}
                          onChange={(e) => setTaskToEdit(e.target.value)}
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn ">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* End of Modal */}
                <FiTrash2
                  onClick={() => setModalOpenDelete(true)}
                  cursor="pointer"
                  className="text-red-500"
                  size={25}
                />
                {/* Modal */}
                <div className={`modal ${modalOpenDelete ? "modal-open" : ""}`}>
                  <div className="modal-box relative">
                    <label
                      onClick={() => setModalOpenEdit(false)}
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    <h3 className="text-lg">
                      Are You Sure, You Want to Delete this Task ?
                    </h3>
                    <div className="modal-action">
                      <button
                        onClick={() => handleDeleteTask()}
                        className="btn"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
                {/* End of Modal */}
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <div className="text-center">
        <button className="btn">Delete All</button>
      </div>
      {/* End of Table */}
    </main>
  );
}
