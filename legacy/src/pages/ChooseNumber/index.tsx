import RaffleInfoCard from "@/components/RaffleInfoCard";
import RaffleSheet from "@/components/RaffleSheet";
import { GetRaffle } from "@/service/raffle";
import { GetUser } from "@/service/user";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChooseNumber = () => {
  const { raffleId, userId } = useParams();
  const [raffle, setRaffle] = useState<Raffle>();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getRaffle = async () => {
      try {
        const res = await GetRaffle(Number(raffleId));

        setRaffle(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUserName = async () => {
      try {
        const res = await GetUser(Number(userId));

        setUserName(res?.data.nombre);
      } catch (error) {
        console.log(error);
      }
    };

    getRaffle();
    getUserName();
  }, [raffleId, userId]);

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
