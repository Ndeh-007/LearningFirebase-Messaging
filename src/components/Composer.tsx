import {
  IonButton,
  IonButtons,
  IonFab,
  IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonProgressBar,
  IonToolbar,
} from "@ionic/react";
import { timeStamp } from "console";
import { mail, send } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { store } from "./Firebase";

const Composer: React.FC<{ chatInfo: { sender: string; receiver: string }, live:Function }> = (
  props
) => {
  const form = useRef<HTMLFormElement>(null);
  const textField = useRef<HTMLIonInputElement>(null);
  const [emptyString, setEmptyString] = useState("");
  const [sending, setSending] = useState(false);

  form.current?.addEventListener("submit", (e: any) => {
    e.target.preventDefault();
    sendMessage();
  });

  function sendMessage() {
    let date = new Date();
    setSending(true);
    store
      .collection("messages")
      .add({
        sender: props.chatInfo.sender,
        receiver: props.chatInfo.receiver,
        body: textField.current?.value,
        timeStamp: date,
      })
      .then(() => {
        console.log("message sent");
        console.log(props.chatInfo);
        setSending(false);
        setEmptyString("");
        props.live(Math.random())
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <IonFab
      slot="fixed"
      horizontal="start"
      vertical="bottom"
      style={{ width: "94%" }}
    >
      {sending ? <IonProgressBar type="indeterminate"></IonProgressBar> : <></>}
      <IonToolbar>
        <IonItem lines="full">
          <IonInput
            value={emptyString}
            name="textfield"
            ref={textField}
            placeholder="Compose Message"
          ></IonInput>
          <IonButton slot="end" fill="clear" onClick={() => sendMessage()}>
            <IonIcon size="large" icon={send}></IonIcon>
          </IonButton>
        </IonItem>
      </IonToolbar>
    </IonFab>
  );
};

export default Composer;
