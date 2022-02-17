import React, { useEffect, useRef, useState } from "react";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonProgressBar,
  IonRouterLink,
  IonSearchbar,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { chatbubbles } from "ionicons/icons";
import dog from "../images/dog.jpg";
import ChatScreen from "../components/ChatScreen";
import { store } from "../components/Firebase";

const Tab1: React.FC = () => {
  let str = localStorage.getItem("name") + " ";
  str = str.substring(0, str.length - 1);
  var messageInfo = {
    sender: str,
    receiver: " ",
    timeStamp: " ",
    profilePicture: " ",
  };
  const [chatScreen, setChatScreen] = useState(false);
  const [USERS, setUSERS] = useState<any[]>([]);
  const [modalData, setModalData] = useState(messageInfo);
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const [messageToast, setMessageToast] = useState(false);
  const toast = useRef<HTMLIonToastElement>(null);

  useEffect(() => {
    listenToFirestore();
  });

  function listenToFirestore() {
    store
      .collection("messages")
      .where("name", "!=", "str")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type == "added" && change.doc.data().receiver == str) {
            toast.current?.setAttribute("message","You have a new message from " + change.doc.data().sender)
          }
          console.log("Change shown")
        });
      });
  }

  function fetchUsers() {
    let tempUsers: any[] = [];
    store
      .collection("users")
      .where("name", "!=", str)
      .get()
      .then((users) => {
        users.forEach((user) => {
          tempUsers.push(user.data());
        });
        setUSERS(tempUsers);
        setFetchingUsers(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function closeChatWindow() {
    setChatScreen(false);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRouterLink href="/">
            <IonTitle size="large">
              Welcome, {localStorage.getItem("name")}
            </IonTitle> 
          </IonRouterLink>
        </IonToolbar>
      </IonHeader> 
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Welcome, {localStorage.getItem("name")}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {fetchingUsers ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <> </>
        )}

        <>
          {USERS.map((user: USER, key) => {
            if (typeof user.profilePicture == "string") {
              return (
                <IonItem
                  lines="full"
                  onClick={() => {
                    setModalData({
                      sender: modalData.sender,
                      receiver: user.name,
                      timeStamp: " ",
                      profilePicture: user.profilePicture,
                    });
                    setChatScreen(true);
                  }}
                  data-username={user.name}
                  key={key}
                >
                  <IonAvatar slot="start">
                    <IonImg src={user.profilePicture}></IonImg>
                  </IonAvatar>

                  <IonLabel>{user.name}</IonLabel>
                  {/* for unread messages */}
                  {/* <IonChip slot="end" color="primary">
                  5
                </IonChip> */}
                </IonItem>
              );
            } else {
              return (
                <IonItem
                  lines="full"
                  onClick={() => {
                    setModalData({
                      sender: modalData.sender,
                      receiver: user.name,
                      timeStamp: " ",
                      profilePicture: user.profilePicture,
                    });
                    setChatScreen(true);
                  }}
                  data-username={user.name}
                  key={key}
                >
                  <IonAvatar slot="start">
                    <IonImg src={dog}></IonImg>
                  </IonAvatar>

                  <IonLabel>{user.name}</IonLabel>
                  {/* for unread messages */}
                  {/* <IonChip slot="end" color="primary">
                  5
                </IonChip> */}
                </IonItem>
              );
            }
          })}
        </>
        {/* 
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={chatbubbles}></IonIcon>
          </IonFabButton>
        </IonFab> */}
      </IonContent>

      <IonModal isOpen={chatScreen} onDidDismiss={() => setChatScreen(false)}>
        <ChatScreen close={closeChatWindow} chatInfo={modalData}></ChatScreen>
      </IonModal>
      <IonToast
        isOpen={messageToast}
        onDidDismiss={() => setMessageToast(false)}
        message="A new message."
        duration={200}
        ref={toast}
      />
    </IonPage>
  );
};

export default Tab1;

interface USER {
  name: string;
  profilePicture: string;
}
