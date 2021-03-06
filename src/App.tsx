import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  square,
  triangle,
  images,
  text,
  chatbubble,
  chatbubbles,
} from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Details from "./pages/Details";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Global CSS */
import "./global.css";
import Login, { SignUp } from "./pages/Login";
import PDF from "./pages/PDF";
import CalcZitopay from "./pages/CalcZitopay";
import ConvertPDF from "./pages/ConvertPDF";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={Tab1} exact />
          <Route path="/tab2" component={Tab2} exact />
          <Route path="/tab3" component={Tab3} exact />
          <Redirect exact from="/" to="/calc" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={chatbubble} />
            <IonLabel>Chat</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={images} />
            <IonLabel>Photos</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={chatbubbles} />
            <IonLabel>Group</IonLabel>
          </IonTabButton> */}
        </IonTabBar>
      </IonTabs>
      <Route path={'/pdf'} component={PDF}></Route>
      <Route path={'/pti'} component={ConvertPDF}></Route>
      <Route path={'/calc'} component={CalcZitopay}></Route>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} exact />
    </IonReactRouter>
  </IonApp>
);

export default App;
