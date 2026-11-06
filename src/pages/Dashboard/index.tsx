import { UserRafflesStats } from "@/features/raffles/components";

const Dashboard = () => {
  return (
    <div className="mb-5 max-w-5xl w-11/12">
      <h1 className="text-2xl md:text-3xl font-bold mb-5 mt-5">Estadísticas</h1>

      <UserRafflesStats />
    </div>
  );
};

export default Dashboard;
