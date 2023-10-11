import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRouter } from "next/router";
import { useMansionRoom } from "../hooks/useMansionRoom";
import { useMemo, useState } from "react";
import { ReservedCalendar } from "../ReservedCalendar";
import { useForm } from "react-hook-form";
import { PlainButton } from "@/components/Button";
import { PlainInput } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReservedRoomSchema } from "../../room/type/schema";
import { roomRepository } from "../rooms.repository";
import { useLoading } from "@/hooks/useLoading";
import { useToast } from "@/hooks/useToast";

export const ReservedMansionRoom = (): JSX.Element => {
  const router = useRouter();
  const { mansion_room_id } = router.query;
  const { mansionRoom } = useMansionRoom(mansion_room_id as string);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(CreateReservedRoomSchema),
  });
  const { showLoading, hideLoading } = useLoading();
  const { showToast, hideToast } = useToast();

  //available_dateからeventを作成
  const events = useMemo(() => {
    return mansionRoom?.available_dates?.map((dateString: any) => {
      return {
        title: "予約可能日",
        start: dateString,
      };
    });
  }, [mansionRoom]);

  const onsubmit = async (data: any) => {
    showLoading();

    await roomRepository
      .reserveRoom({
        input: data,
        mansion_room_id: mansionRoom?.id!,
      })
      .then(({ style, message }) => {
        showToast({ style, message });
        setTimeout(() => {
          hideToast();
          // router.reload()
        }, 4000);
        hideLoading();
      })
      .catch((error) => {
        hideLoading();
        throw error;
      });
  };

  return (
    <div className="flex items-center justify-center">
      {/* <ReservedCalendar
        events={events}
      /> */}
      <form onSubmit={handleSubmit(onsubmit)} className="my-8 space-y-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: "prev,next",
            center: "title",
            end: "dayGridMonth,dayGridWeek",
          }}
          locale="ja" // 日本語化
          selectable={true}
          selectMirror={true}
          selectOverlap={false}
          eventDurationEditable={true}
          events={events}
          eventClick={(clickInfo) => {
            const eventDate = clickInfo.event.start;
            const stay_date = eventDate?.toISOString().split("T")[0];
            setValue("stay_date", stay_date);
            // setSelectedDate(eventDate)
          }}
        />

        <div className="flex ">
          <PlainInput
            label="苗字"
            register={register}
            registerValue="last_name"
            inputType="text"
            placeholder="鈴木"
            error={errors.last_name?.message as string}
          />
          <PlainInput
            label="名前"
            register={register}
            registerValue="first_name"
            inputType="text"
            placeholder="太郎"
            error={errors.first_name?.message as string}
          />
        </div>
        <PlainInput
          label="電話番号"
          register={register}
          registerValue="phone_number"
          inputType="tel"
          placeholder="「-」無しの数字でお願いします。"
          error={errors.phone_number?.message as string}
        />
        <PlainInput
          label="住所"
          register={register}
          registerValue="address"
          inputType="text"
          placeholder="兵庫県西宮市西宮ハウス211号室"
          error={errors.address?.message as string}
        />
        <PlainInput
          label="メールアドレス"
          register={register}
          registerValue="email"
          inputType="email"
          placeholder="メールアドレス"
          error={errors.email?.message as string}
        />

        <PlainButton innerText="作成" type="submit" />
      </form>
    </div>
  );
};
