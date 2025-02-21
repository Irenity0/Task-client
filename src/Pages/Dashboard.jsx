import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { loading, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch tasks securely
  const { data: tasks = [], refetch, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosSecure.get("/tasks");
      return response.data;
    },
  });

  // State for tasks categorized by status
  const [taskColumns, setTaskColumns] = useState({
    todo: [],
    "in-progress": [],
    done: [],
  });

  // Update local state when tasks are fetched
  useEffect(() => {
    if (tasks.length > 0) {
      setTaskColumns({
        todo: tasks.filter((task) => task.status === "todo"),
        "in-progress": tasks.filter((task) => task.status === "in-progress"),
        done: tasks.filter((task) => task.status === "done"),
      });
    }
  }, [tasks]);

  // Update task status mutation using PATCH
  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      await axiosSecure.patch(`/tasks/${updatedTask._id}/status`, {
        status: updatedTask.status,
      });
    },
    onSuccess: () => {
      refetch(); // Refetch tasks after updating
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId) => {
      await axiosSecure.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      refetch(); // Refetch tasks after deleting
    },
  });

  // Handle drag end
  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside a valid destination, return early
  
    const { source, destination } = result;
    const sourceColumn = taskColumns[source.droppableId];
    const destColumn = taskColumns[destination.droppableId];
  
    // Check if task is being moved within the same column
    const isSameColumn = source.droppableId === destination.droppableId;
  
    const [movedTask] = sourceColumn.splice(source.index, 1);
    // If moving within the same column, only update the order (no status change)
    if (isSameColumn) {
      sourceColumn.splice(destination.index, 0, movedTask);
      setTaskColumns({
        ...taskColumns,
        [source.droppableId]: sourceColumn, // Update the task order in the same column
      });
      return; // Skip status update
    }
  
    // If task is moved to a different column, update the status
    movedTask.status = destination.droppableId;
    destColumn.splice(destination.index, 0, movedTask);
  
    setTaskColumns({
      ...taskColumns,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  
    // Only update the status if the status has changed
    updateTaskMutation.mutate(movedTask);
  };
  

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out successfully"))
      .catch((error) => console.error("Error logging out:", error));
  };

  const handleDelete = (taskId) => {
    deleteTaskMutation.mutate(taskId);
  };

  if (loading || isLoading ) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-base-300">
        <div className="w-11/12 mx-auto py-4 flex items-center justify-between">
          <button className="btn btn-soft" onClick={handleLogout}>
            Log out
          </button>
          <NavLink className="btn btn-soft btn-sm" to={"/addTask"}>
            Task
          </NavLink>
          <input type="checkbox" value="light" className="toggle theme-controller" />
        </div>
      </div>
      <br />

      {/* Kanban Board */}
      <div className="md:flex space-y-10 ml-15 md:ml-0 justify-center gap-6">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(taskColumns).map((status) => (
            <Droppable key={status} droppableId={status} isCombineEnabled={false} ignoreContainerClipping={false} isDropDisabled={false}>
              {(provided) => (
                <div
                  className="w-80 bg-base-300 p-4 rounded-lg shadow-md"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-lg font-bold text-center capitalize">{status}</h2>
                  {taskColumns[status].map((task, taskIndex) => (
                    <Draggable key={task._id} draggableId={task._id} index={taskIndex}>
                      {(provided) => (
                        <div
                          className="bg-base-200 p-2 rounded-md shadow-md mt-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="flex justify-between items-center">
                            <span>{task.title}</span>
                            <div className="flex gap-2">
                              <Link
                                to={`/edit/${task._id}`}
                                className="btn btn-sm btn-primary"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(task._id)}
                                className="btn btn-sm btn-error"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  );
};

export default Dashboard;