import { Component, createRef } from "react";

class FilterForm extends Component {
  constructor(props) {
    super(props);

    this.statusRef = createRef();
    this.departmentRef = createRef();
  }

  handleSearchParmas = () => {
    const rawParams =
      this.props.type === "projects"
        ? {
            status: this.statusRef.current.value,
            department: this.departmentRef.current.value,
          }
        : {
            status: this.statusRef.current.value,
          };

    const filtered = Object.fromEntries(
      Object.entries(rawParams).filter(([_, value]) => value !== "")
    );

    const params = new URLSearchParams(filtered);

    this.props.setSearchParams(params.toString());
  };

  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  render() {
    return (
      <div className="fixed top-2/4 left-2/4 -translate-2/4 h-screen w-screen grid place-content-center bg-[#0000006e] rounded-xl shadow-xl">
        <form
          className="bg-white rounded-xl p-8 flex flex-col gap-4 w-[500px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Filter</h3>
            <button
              type="button"
              onClick={() => this.props.setFilter((prev) => !prev)}
              className="text-xl font-bold cursor-pointer"
            >
              X
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            <label htmlFor="status">Status</label>
            <select
              className="border border-gray-400 rounded-lg py-2 px-3"
              ref={this.statusRef}
              name="status"
              onChange={this.handleSearchParmas}
            >
              <option value="">Choose a status</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
              <option value="in-progress">In-Progress</option>
              <option value="paused">Paused</option>
              <option value="planning">Planning</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          {this.props.type === "projects" && (
            <div className="flex flex-col gap-2.5">
              <label htmlFor="department">Department</label>
              <select
                className="border border-gray-400 rounded-lg py-2 px-3"
                ref={this.departmentRef}
                name="department"
                onChange={this.handleSearchParmas}
              >
                <option value="">Choose a department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default FilterForm;
