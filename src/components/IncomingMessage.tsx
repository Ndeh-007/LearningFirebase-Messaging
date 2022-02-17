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
  
  const IncomingMessage: React.FC<{messageDetails:{messageBody:string,timeStamp: string}}> = (props) => {
    console.log(props.messageDetails.timeStamp)
    return (
      <IonRow>
        <IonCol size="10">
          <IonCard color="dark" style={{width:"max-content", maxWidth:"100%", float:"left"}}>
            <IonCardContent>
              <IonText color="light">
                {" "}
                <p>
                  {props.messageDetails.messageBody}
                </p>
              </IonText>
              <IonText color="medium" style={{ float: "right", paddingTop:"10px" }}>
                <p>{props.messageDetails.timeStamp}</p>
              </IonText>
            </IonCardContent>
          </IonCard>
        </IonCol>
        <IonCol></IonCol>
      </IonRow>
    );
  };
  
  export default IncomingMessage;
  