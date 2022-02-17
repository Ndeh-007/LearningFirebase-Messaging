import { IonHeader, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Sub:React.FC = ()=>{
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <IonText color="clear"></IonText>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}