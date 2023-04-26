import { useLogoutMutation } from "../services/Travelthreads";

const Logout = () => {
  const [logout] = useLogoutMutation();
  return <button onClick={logout}>Logout</button>;
};

export default Logout;
