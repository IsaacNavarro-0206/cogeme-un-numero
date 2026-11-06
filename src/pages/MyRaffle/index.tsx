import AcceptedNumberCard from "@/features/raffle-sheet/components/AcceptedNumberCard";
import { RaffleInfoCard, RaffleStatsCard } from "@/features/raffles/components";
import RequestCard from "@/features/raffle-sheet/components/RequestCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyRaffle = () => {
  return (
    <>
      <br />

      <RaffleInfoCard />

      <br />

      <Tabs defaultSelectedKey="pending" className="max-w-2xl flex flex-col w-11/12">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger id="pending">Pendientes</TabsTrigger>

          <TabsTrigger id="accepted">Aceptados</TabsTrigger>

          <TabsTrigger id="stats">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent id="pending">
          <RequestCard />
        </TabsContent>

        <TabsContent id="accepted">
          <AcceptedNumberCard />
        </TabsContent>

        <TabsContent id="stats">
          <RaffleStatsCard />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MyRaffle;
