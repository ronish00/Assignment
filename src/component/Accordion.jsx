import { Activity, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterForm from "./FilterForm";

const Accordion = ({ item }) => {
  const [data, setData] = useState(item);
  const [collapse, setCollapse] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(false);

  const status = searchParams.get("status");

  useEffect(() => {
    let filtered = item.tasks;

    if (status) {
      filtered = filtered.filter((i) => i.status === status);
    }

    setData({
      ...item,
      tasks: filtered,
    });
  }, [status]);
  return (
    <li className="shadow-lg rounded-xl p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{data.title}</h3>
        <div className="flex items-center gap-8">
          {collapse && (
            <>
              <button
                onClick={() => setSearchParams("")}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setFilter((prev) => !prev)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg cursor-pointer"
              >
                Filter
              </button>
            </>
          )}

          <p className="text-red-500">Deadline: {data.deadline}</p>
          <button
            onClick={() => setCollapse((prev) => !prev)}
            className={`${
              collapse ? "rotate-180" : "rotate-0"
            } bg-blue-500 text-white cursor-pointer px-5 py-2.5 rounded-xl transition-all`}
          >
            V
          </button>
        </div>
      </div>
      <Activity mode={collapse ? "visible" : "hidden"}>
        <div className="flex flex-col divide-y divide-gray-300">
          {data?.tasks?.map((task) => (
            <div key={task.id} className="py-6">
              <h3 className="font-semibold">Task: {task.title}</h3>
              <p className="text-gray-500">Status: {task.status}</p>
              <div className="mt-6 flex items-center gap-12">
                {task?.assignedTo?.map((member) => (
                  <div key={member.id}>
                    <p>
                      Assigned to: {member.name} - {member.role}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      Skills:
                      {member?.skills?.map((skill) => (
                        <p className="text-gray-500" key={skill}>
                          {skill}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="mb-2 font-semibold">Comments: </h4>
                {task?.comments.map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.message}</p>
                    <p className="text-gray-500">
                      By: {comment.by} on {comment.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Activity>
      <Activity mode={filter ? "visible" : "hidden"}>
        <FilterForm
          type="tasks"
          setFilter={setFilter}
          setSearchParams={setSearchParams}
        />
      </Activity>
    </li>
  );
};

export default Accordion;
