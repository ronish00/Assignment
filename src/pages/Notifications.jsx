import Container from "../component/Container";
import { Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

const Notifications = () => {
  const [notifications, setNotifications] = useNotification();
  console.log(notifications);

  const handleSeen = (id) => {
    setNotifications((prev) =>
      prev.map((item) => item.id === id ? { ...item, seen: true } : item)
    );
  };

  return (
    <Container>
      <h1 className="text-5xl font-bold">Notifications</h1>
      <ul className="mt-12 flex flex-col gap-3">
        {notifications.map((item) => (
          <li key={item.id} onClick={() => handleSeen(item.id)}>
            <Link
              to={`/projects/${item?.ref?.projectId}`}
              className="bg-white shadow-xl p-6 rounded-xl flex items-center justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{item.message}</h3>
                <p>{item.type}</p>
              </div>
              <p className="text-lg">{item.seen ? "Seen" : "Not Seen"}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Notifications;
