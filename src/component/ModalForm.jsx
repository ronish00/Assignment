import { Component, createRef } from "react";

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      department: "",
      status: "",
      email: "",
      budget: "",
    };

    this.projectNameRef = createRef();
    this.departmentRef = createRef();
    this.statusRef = createRef();
    this.emailRef = createRef();
    this.budgetRef = createRef();
  }

  resetFocus = () => {
    this.setState({
      name: "",
      department: "",
      status: "",
      email: "",
      budget: "",
    });

    this.projectNameRef.current.value = "";
    this.departmentRef.current.value = "";
    this.statusRef.current.value = "";
    this.emailRef.current.value = "";
    this.budgetRef.current.value = "";

    this.projectNameRef.current.focus();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(
      {
        name: this.projectNameRef.current.value,
        department: this.departmentRef.current.value,
        status: this.statusRef.current.value,
        email: this.emailRef.current.value,
        budget: this.budgetRef.current.value,
      },
      () => {
        if (
          !this.state.name.trim() ||
          !this.state.department.trim() ||
          !this.state.status.trim() ||
          !this.state.email.trim() ||
          !this.state.budget.trim()
        ) {
          alert("Please fill all the fields");
          return;
        }

        new Notification("Notification", {
          body: `New Project ${this.state.name} created successfully`,
        });

        this.resetFocus();
        this.props.setModal(false);
      }
    );
  };

  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  render() {
    return (
      <div className="absolute top-2/4 left-2/4 -translate-2/4 bg-[#0000006e] h-screen w-screen grid place-content-center">
        <form
          className="bg-white rounded-xl p-8 flex flex-col gap-4 w-[500px]"
          method="post"
          onSubmit={this.handleSubmit}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Add Project</h3>
            <button
              type="button"
              onClick={() => this.props.setModal((prev) => !prev)}
              className="text-xl font-bold cursor-pointer"
            >
              X
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            <label htmlFor="name">Project Name</label>
            <input
              className="border border-gray-400 rounded-lg py-2 px-3"
              ref={this.projectNameRef}
              type="text"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label htmlFor="department">Department</label>
            <select
              className="border border-gray-400 rounded-lg py-2 px-3"
              ref={this.departmentRef}
              name="department"
              onChange={(e) => this.setState({ department: e.target.value })}
            >
              <option value="">Choose a department</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
          <div className="flex flex-col gap-2.5">
            <label htmlFor="status">Status</label>
            <select
              className="border border-gray-400 rounded-lg py-2 px-3"
              ref={this.statusRef}
              name="status"
              onChange={(e) => this.setState({ status: e.target.value })}
            >
              <option value="">Choose a status</option>
              {this.state.department == "engineering" ? (
                <>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                </>
              ) : this.state.department === "marketing" ? (
                <>
                  <option value="active">Active</option>
                  <option value="planning">Planning</option>
                  <option value="on-hold">On Hold</option>
                </>
              ) : (
                <option value={""}>Please select a department first</option>
              )}
            </select>
          </div>
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email">Owner Email</label>
            <input
              className="border border-gray-400 rounded-lg py-2 px-3"
              ref={this.emailRef}
              type="email"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label htmlFor="budget">Budget</label>
            <input
              className="border border-gray-400 rounded-lg py-2 px-3"
              ref={this.budgetRef}
              type="text"
              name="budget"
            />
          </div>
          <input
            className="bg-blue-500 rounded-lg py-2.5 text-white"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

export default ModalForm;
