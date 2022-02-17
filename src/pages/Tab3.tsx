import React from "react";
import { 
  IonHeader, 
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";  
import './Tab3.css';

const Tab3: React.FC = () => { 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Hello</IonTitle>
        </IonToolbar>
      </IonHeader> 
    </IonPage>
  );
};

export default Tab3;
