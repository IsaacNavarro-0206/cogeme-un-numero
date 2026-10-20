import AcceptedNumberCard from "@/features/raffle-sheet/components/AcceptedNumberCard";
import { RaffleInfoCard } from "@/features/raffles/components";
import RequestCard from "@/features/raffle-sheet/components/RequestCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyRaffle = () => {
  return (
    <>
      <br />

      <RaffleInfoCard />

      <br />

      <Tabs defaultSelectedKey="pending" className="max-w-2xl flex flex-col w-11/12">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger id="pending">Solicitudes Pendientes</TabsTrigger>

          <TabsTrigger id="accepted">Números Aceptados</TabsTrigger>
        </TabsList>

        <TabsContent id="pending">
          <RequestCard />
        </TabsContent>

        <TabsContent id="accepted">
          <AcceptedNumberCard />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MyRaffle;
