import { useEffect, useState } from "react";
import { roomRepository } from "../rooms.repository";
import { useLoading } from "@/hooks/useLoading";

export const useMansionRoom = (room_id: string | undefined) => {
  const { showLoading, hideLoading } = useLoading();
  const [ mansionRoom, setMansionRoom ] = useState<any>();

  useEffect(() => {
    if (!room_id) return 
    (async () => {
      showLoading();
      const fetchedMansionRoom = await roomRepository.getOne(room_id as string);
      setMansionRoom(fetchedMansionRoom)
      hideLoading();
    })()
  }, [room_id])

  return { mansionRoom }
}