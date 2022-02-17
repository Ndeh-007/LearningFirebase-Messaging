import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react"; 
import React from "react";

const OutgoingMessage: React.FC<{messageDetails:{messageBody:string,timeStamp: string}}> = (props) => {
  return (
    <IonRow>
      <IonCol></IonCol>
      <IonCol size="10" pull="0.5">
        <IonCard color="primary" style={{width:"max-content", maxWidth:"100%", float:"right"}}>
          <IonCardContent>
            <IonText color="dark">
              {" "}
              <p>
                {props.messageDetails.messageBody}
              </p>
            </IonText>
            <IonText color="light" style={{ float: "right", paddingTop:"10px"}}>
            <p>{props.messageDetails.timeStamp}</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default OutgoingMessage;
