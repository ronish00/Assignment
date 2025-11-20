import { useParams } from "react-router-dom";
import Container from "../component/Container";
import { projects } from "../constants";
import Accordion from "../component/Accordion";

const ProjectDetails = () => {
  const { id } = useParams();
  const data = projects.find((item) => item.id == id);

  return (
    <Container>
      <h1 className="text-5xl font-bold">{data.name}</h1>
      <section className="mt-12 w-[500px]">
        <h2 className="text-2xl font-bold">Owner:</h2>
        <div className="mt-4 grid grid-cols-2">
          <p>Name: {data.owner.name}</p>
          <p>Email: {data.owner.email}</p>
          {data.owner?.contact?.phone && <p>Phone: {data.owner.contact.phone}</p>}
          {data.owner?.contact?.office && <p>Office: {data.owner.contact.office}</p>}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Milestone and Tasks</h2>
        <ul className="mt-8">
          {
            data.milestones.length > 0 ? (
              data.milestones.map((item) => (
                  <Accordion key={item.id} item={item} />
              ))
            ) : (
              <p className="text-gray-500">No Milestones Found</p>
            )
          }
        </ul>
      </section>
    </Container>
  );
};

export default ProjectDetails;
