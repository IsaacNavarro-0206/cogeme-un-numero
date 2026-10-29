import { RaffleInfoCard } from "@/features/raffles/components";
import RaffleSheet from "@/features/raffle-sheet/components/RaffleSheet";
import { useRaffle } from "@/features/raffles/hooks";
import { useGetUser } from "@/features/profile/hooks";
import { useParams } from "react-router-dom";

const ChooseNumber = () => {
  const { raffleId, userId } = useParams();

  const { data: raffle } = useRaffle(String(raffleId));
  const { data: user } = useGetUser(String(userId));
  const userName = user?.nombre || "";

  return (
    <>
      <br />

      <RaffleInfoCard raffle={raffle} userName={userName} />

      <br />

      <RaffleSheet maxNumber={raffle?.numeroMaximo ?? 0} raffleId={raffleId} />
    </>
  );
};

export default ChooseNumber;
