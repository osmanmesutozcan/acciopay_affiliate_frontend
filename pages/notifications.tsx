import { Layout } from "../components/common/layoutComponents/Layout";
import useSWR from "swr";
import { fetcher, poster } from "../utils/fetcher";
import React, { useEffect, useState } from "react";
import { INotificationData } from "../utils/schema";
import { IErrorProps, SorryError } from "../components/common/layoutComponents/Error";
import { NotificationIcon, UnreadNotificationIcon } from "../components/common/iconComponents/NotificationIcon";
import formatRelative from "date-fns/formatRelative";
import capitalize from "lodash/capitalize";
import Skeleton from "@mui/material/Skeleton";
import { BellIcon, UnreadBellIcon } from "../components/common/iconComponents/BellIcon";
import { PrimaryButton, SecondaryButton } from "../components/common/Button";
import { LoadingInline } from "../components/common/layoutComponents/Loading";

function NotificationCard({
  notification,
  isEditing,
  setItemCheckState,
}: {
  notification: INotificationData;
  isEditing: boolean;
  setItemCheckState: (checked: boolean) => void;
}) {
  function getNotificationDate(date) {
    return capitalize(formatRelative(new Date(date), Date.now()));
  }

  function notificationIcon(n: INotificationData) {
    if (n.data.type === "information") {
      return notification.read_at ? (
        <NotificationIcon className="h-6 w-6" />
      ) : (
        <UnreadNotificationIcon className="h-6 w-6" />
      );
    }
    if (n.data.type === "notice") {
      return notification.read_at ? <BellIcon className="h-6 w-6" /> : <UnreadBellIcon className="h-6 w-6" />;
    }
  }

  return (
    <div className="flex my-2">
      {isEditing && <input type="checkbox" onChange={(e) => setItemCheckState(e.target.checked)} className="mr-3" />}
      <div className="w-6 mr-2">{notificationIcon(notification)}</div>
      <div className="">
        <h2 className="text-[12px] font-bold block mb-1">{notification.data.title}</h2>
        <span className="text-[12px] block text-gray-800 font-light">{notification.data.description}</span>
        <span className="text-[8px] text-gray-400">{getNotificationDate(notification.created_at)}</span>
      </div>
    </div>
  );
}

export default function Notifications() {
  const [isEditing, setIsEditing] = useState(false);
  const [_checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: notifications,
    error: notificationsError,
    mutate: mutateNotifications,
  } = useSWR<{ data: { information: INotificationData[]; notice: INotificationData[] }; count: number }, IErrorProps>(
    "/api/notifications",
    fetcher
  );

  // Mark all notifications as read after 1000ms timeout.
  //  do not mark if navigated back before 1000ms.
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("mark notifications as read.");
      poster("/api/notifications", {}, {}).then((r) => {
        console.log("red notifications", r);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (notificationsError) {
    console.log(notificationsError);
    return <SorryError />;
  }

  async function handleDeleteNotifications() {
    setIsLoading(true);
    try {
      await poster("/api/notifications", { ids: _checkedItems }, {}, "DELETE");
      await mutateNotifications();
    } catch (err) {
      console.log(err);
      <SorryError />;
    }
    setIsLoading(false);
    setIsEditing(false);
  }

  function handleCheckedItem(id: string, checked: boolean) {
    const checkedItems = new Set<string>(_checkedItems);
    if (checked) checkedItems.add(id);
    else checkedItems.delete(id);
    setCheckedItems(Array.from(checkedItems));
  }

  return (
    <Layout back title="Notifications" contentClassname="p-0">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xs text-gray-text my-2">Information</h2>
          <button onClick={() => setIsEditing(true)} className="text-xs underline text-primary">
            Manage
          </button>
        </div>
        {notifications ? (
          notifications.data.information.length > 0 ? (
            notifications.data.information.map((n) => (
              <NotificationCard
                key={`notification_card_${n.id}`}
                notification={n}
                isEditing={isEditing}
                setItemCheckState={(checked) => handleCheckedItem(n.id, checked)}
              />
            ))
          ) : (
            <p className="text-center my-4 text-gray-paragraph">No information notifications</p>
          )
        ) : (
          <Skeleton variant="rectangular" height={82} />
        )}
      </div>
      <div className="h-2 w-full bg-gray-light" />
      <div className="px-4">
        <h2 className="font-bold text-xs text-gray-text my-2">Notice</h2>
        {notifications ? (
          notifications.data.notice.length > 0 ? (
            notifications.data.notice.map((n) => (
              <NotificationCard
                key={`notification_card_${n.id}`}
                notification={n}
                isEditing={isEditing}
                setItemCheckState={(checked) => handleCheckedItem(n.id, checked)}
              />
            ))
          ) : (
            <p className="text-center my-4 text-gray-paragraph">No notice notifications</p>
          )
        ) : (
          <Skeleton variant="rectangular" height={82} />
        )}
      </div>

      {isEditing && (
        <div className="px-4 mt-10 flex items-center space-x-5">
          <SecondaryButton onClick={() => setIsEditing(false)} disabled={isLoading} className="w-full h-8">
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={() => handleDeleteNotifications()} disabled={isLoading} className="w-full h-8">
            {isLoading && <LoadingInline color="#fff" className="mr-2" />}Delete
          </PrimaryButton>
        </div>
      )}
    </Layout>
  );
}
