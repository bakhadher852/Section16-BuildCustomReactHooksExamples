import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);
  //de-structuring data from useHttp custom hook
  // sendRequest: fetchTasks  Giving sendRequest a new name which is fetchTasks
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    //transformTasks has the data obj which coming from firebase we filter it or we take what we need from the data by using this function
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    //from here we pass the data to useEffect to avoid making loop request
    fetchTasks(
      {
        url: "https://react-http-c7821-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
