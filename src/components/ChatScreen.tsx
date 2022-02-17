import {
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack, ellipsisVertical } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import dog from "../images/dog.jpg";
import Composer from "./Composer";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { store } from "./Firebase";

const ChatScreen: React.FC<{
  close: Function;
  chatInfo: {
    sender: string;
    receiver: string;
    timeStamp: string | Date;
    profilePicture: string;
  };
}> = (props) => {
  const [ChatSettingsPopover, setChatSettingsPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [allMessages, setAllMessages] = useState([]);
  const [live, setLive] = useState(0);
  const padding = useRef<HTMLDivElement>(null);

  function liveReload(value: number) {
    setLive(value);
  }

  useEffect(() => {
    // getMessages();
    listenToFirestore();
    padding.current?.scrollIntoView({ behavior: "smooth" });
  }, [live]);

  function listenToFirestore() {
    store.collection("messages").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (
          (change.doc.data().sender === props.chatInfo.sender &&
            change.doc.data().receiver === props.chatInfo.receiver) ||
          (change.doc.data().receiver === props.chatInfo.sender &&
            change.doc.data().sender === props.chatInfo.receiver)
        ) {
          getMessages();
        }
      });
    });
  }

  function convertToDate(time: {}) {
    let T = JSON.parse(JSON.stringify(time));
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(T.seconds);
    let m = t.getMinutes().toLocaleString();
    if (m.length < 2) {
      m = "0" + m.toLocaleString();
    }
    return t.getHours() + ":" + m;
  }
  let time: string[];

  function getMessages() {
    let m: any = [];
    store
      .collection("messages")
      .orderBy("timeStamp")
      .get()
      .then((messages) => {
        messages.forEach((message) => {
          if (
            (message.data().sender === props.chatInfo.sender &&
              message.data().receiver === props.chatInfo.receiver) ||
            (message.data().receiver === props.chatInfo.sender &&
              message.data().sender === props.chatInfo.receiver)
          ) {
            m.push(message.data());  
          }
        });
        m.forEach((ele:any)=>{
          console.log(ele)
        })
        setAllMessages(m);
        padding.current?.scrollIntoView({ behavior: "smooth" });
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonChip
            slot="start"
            color="primary"
            onClick={() => {
              props.close();
            }}
          >
            <IonIcon icon={arrowBack} color="dark"></IonIcon>
            {typeof props.chatInfo.profilePicture == "string" ? (
              <IonAvatar>
                <IonImg src={props.chatInfo.profilePicture}></IonImg>
              </IonAvatar>
            ) : (
              <IonAvatar>
                <IonImg src={dog}></IonImg>
              </IonAvatar>
            )}
          </IonChip>
          <IonTitle>{props.chatInfo.receiver}</IonTitle>
          <IonButton
            fill="clear"
            slot="end"
            onClick={(e: any) => {
              e.persist();
              setChatSettingsPopover({ showPopover: true, event: e });
            }}
          >
            <IonIcon icon={ellipsisVertical} color="dark"></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid
          onChange={() => {
            padding.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {allMessages.map((message: msg, key) => {
            if (message?.sender == props.chatInfo.sender) {
              let messageDetails = {
                messageBody: message.body,
                timeStamp: message.date,
              };
              // console.log(messageDetails.timeStamp)
              return (
                <OutgoingMessage
                  messageDetails={messageDetails}
                  key={key}
                ></OutgoingMessage>
              );
            } else {
              let messageDetails = {
                messageBody: message.body,
                timeStamp: message.date,
              };
              return (
                <IncomingMessage
                  messageDetails={messageDetails}
                  key={key}
                ></IncomingMessage>
              );
            }
          })}
        </IonGrid>
        <div id="padding" ref={padding} style={{ height: "60px" }}></div>
        <Composer chatInfo={props.chatInfo} live={liveReload}></Composer>
      </IonContent>
      <>
        <IonPopover
          event={ChatSettingsPopover.event}
          isOpen={ChatSettingsPopover.showPopover}
          onDidDismiss={() =>
            setChatSettingsPopover({ showPopover: false, event: undefined })
          }
        >
          <IonItem>
            <IonLabel>Clear chat history</IonLabel>
            <IonButton color="danger">Clear</IonButton>
          </IonItem>
        </IonPopover>
      </>
    </>
  );
};

export default ChatScreen;

interface msg {
  sender: string;
  receiver: string;
  date: string;
  body: string;
}
