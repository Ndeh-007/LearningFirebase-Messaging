import React, { useRef, useState } from "react";
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonRouterLink,
  IonProgressBar, 
  IonIcon,
  IonButtons,
} from "@ionic/react";
import { store } from "../components/Firebase";
import { firebase } from "../components/Firebase";
import { arrowBack } from "ionicons/icons";
// import { useHistory } from "react-router";   

const Login: React.FC = () => {
  const toChat = useRef<HTMLIonButtonElement>(null);
  const usernameInput = useRef<HTMLIonInputElement>(null);
  const passwordInput = useRef<HTMLIonInputElement>(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [sending, setSending] = useState(false); 

  function signInWithGoogle() {
    var google_provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(google_provider)
      .then((message) => {
        let googleUser = {
          name: message.user?.displayName,
          profilePicture: message.user?.photoURL,
        };
        store
          .collection("users")
          .add({...googleUser })
          .then((data) => {
            localStorage.setItem("name", (googleUser.name + "").toString());
            console.log("Google User Added");
            console.log(data)  
            toChat.current?.click();
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  }

  let users = [];

  function login() {
    if (usernameInput.current?.value == "") {
      setErrorMessage(true);
    } else {
      setSending(true);
      store
        .collection("users")
        .where("name", "==", usernameInput.current?.value)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            console.log(doc.data().id);
            if (doc.exists) {
              setSending(false);
              toChat.current?.click();
              localStorage.setItem("name", usernameInput.current?.value + "");
            } else {
              setErrorMessage(true);
              setSending(false);
              console.log("invalid user");
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Login</IonTitle>
          <IonButton slot="end" fill="clear" href="/signup">
            Create Account
          </IonButton>
        </IonToolbar>
        {sending ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <> </>
        )}
      </IonHeader>
      <IonContent>
        {errorMessage ? (
          <IonItem color="danger">
            <IonLabel>User Does not Exist</IonLabel>
          </IonItem>
        ) : (
          <></>
        )}
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput required ref={usernameInput} type="text"></IonInput>
        </IonItem>
        {/* <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput required ref={passwordInput} type="password"></IonInput>
        </IonItem> */}
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                expand="full"
                onClick={() => {
                  login();
                }}
              >
                Sign In
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              {/* <IonButton
                fill="clear"
                expand="full"
                color="success"
                onClick={() => {
                  signInWithGoogle();
                }}
              >
                Sign In With Google
              </IonButton> */}
            </IonCol>
            <IonRouterLink  href="/tab1" >
              <IonButton style={{ display: "none" }} ref={toChat}></IonButton>
            </IonRouterLink>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export const SignUp: React.FC = () => {
  const toChat = useRef<HTMLIonButtonElement>(null);
  const username = useRef<HTMLIonInputElement>(null);
  const password = useRef<HTMLIonInputElement>(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [sending, setSending] = useState(false);

  function createAccount() {
    if (username.current?.value == "") {
      setErrorMessage(true);
    } else {
      setSending(true);
      store
        .collection("users")
        .add({
          name: username.current?.value,
        })
        .then(() => {
          setSending(false);
          localStorage.setItem("name", username.current?.value + "");
          toChat.current?.click();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonRouterLink href="/">
              <IonButton fill="clear">
                <IonIcon icon={arrowBack}></IonIcon>
              </IonButton>
            </IonRouterLink>
          </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
        {sending ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <></>
        )}
      </IonHeader>
      <IonContent>
        {errorMessage ? (
          <IonItem color="danger">
            <IonLabel>Input Field is Empty</IonLabel>
          </IonItem>
        ) : (
          <> </>
        )}
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput ref={username} type="text"></IonInput>
        </IonItem>
        {/* <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput ref={password} type="password"></IonInput>
        </IonItem> */}
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick={() => {
                  createAccount();
                }}
              >
                Create Account
              </IonButton>
              <IonRouterLink href="/tab1">
                <IonButton style={{ display: "none" }} ref={toChat}></IonButton>
              </IonRouterLink>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
