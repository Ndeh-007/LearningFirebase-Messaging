import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
  } from "@ionic/react";
  import { useRef, useState } from "react"; 
  import React from "react";
  
  const CalcZitopay: React.FC = () => {
    const [ans, setAns] = useState(0);
    const amount = useRef<HTMLIonInputElement>(null);
    const compute = useRef<HTMLIonButtonElement>(null);
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Zitopay C. Calulator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Zitopay C. Calulator</IonTitle>
            </IonToolbar>
          </IonHeader>
  
          <IonItem lines="none">
            <IonItem>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  compute.current?.click();
                }}
              >
                <IonLabel position="floating">Amount</IonLabel>
                <IonInput type="number" ref={amount}></IonInput>
              </form>
            </IonItem>
            <IonButton
              slot="end"
              ref={compute}
              onClick={() => {
                let x =
                  (Number(amount.current?.value) * 2.6) / 100 +
                  10.0 +
                  Number(amount.current?.value) +
                  0.0;
                setAns(x);
              }}
            >
              compute
            </IonButton>
          </IonItem>
          <IonCard>
            <IonCardContent>
              <IonCardSubtitle>Amount Plus Charges</IonCardSubtitle>
              <IonCardTitle>{ans}</IonCardTitle>
            </IonCardContent>
          </IonCard> 
        </IonContent>
      </IonPage>
    );
  };
  
  export default CalcZitopay;
  