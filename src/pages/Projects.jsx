import { Link, useSearchParams } from "react-router-dom";
import { Activity, useEffect, useState } from "react";
import Container from "../component/Container";
import ModalForm from "../component/ModalForm";
import FilterForm from "../component/FilterForm";
import { projects } from "../constants";

const Projects = () => {
  const [data, setData] = useState(projects);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState(false);

  const status = searchParams.get("status");
  const department = searchParams.get("department");

  useEffect(() => {
    let filtered = projects;

    if (status) {
      filtered = filtered.filter((item) => item.status === status);
    }

    if (department) {
      filtered = filtered.filter((item) => item.department === department);
    }

    setData(filtered);
  }, [status, department]);

  return (
    <Container>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">All Projects</h1>
        <div className="flex gap-3 items-center">
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
          <button
            onClick={() => setModal((prev) => !prev)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            Add Project
          </button>
        </div>
      </div>
      <table className="w-full bg-white rounded-lg shadow-md mt-8">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
              Project Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
              Department
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
              Owner Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
              Budget
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <Link
                    to={`${item.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {item.department}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {item.owner.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      item.status === "active"
                        ? "bg-green-100 text-green-800"
                        : item.status === "planning"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ${item.resources.spent}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-8 text-center text-gray-500 text-sm"
              >
                <div className="flex flex-col items-center justify-center">
                  No data found
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Activity mode={modal ? "visible" : "hidden"}>
        <ModalForm setModal={setModal} />
      </Activity>
      <Activity mode={filter ? "visible" : "hidden"}>
        <FilterForm
          type="projects"
          setSearchParams={setSearchParams}
          setFilter={setFilter}
        />
      </Activity>
    </Container>
  );
};

export default Projects;
