import {
  IonButton,
  IonCard, 
  IonContent,
  IonHeader,
  IonImg,
  IonPage, 
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { pdfStorageRef, samplePDFRef } from "../components/Firebase";
import { getDocument } from "./imports.js";
import { GlobalWorkerOptions } from "./imports.js";
GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/build/pdf.worker.js";

const ConvertPDF: React.FC = () => {
  const pdfImage = useRef<HTMLIonImgElement>(null);
  const base = useRef<HTMLDivElement>(null);
  const [imagesArray, setImagesArray] = useState<any[]>([]);

  function showPDF() {
    const images: any[] = [];
    let URL: string;
    let numOfPages: number;

    // fetch file from storage
    pdfStorageRef
      .child("files/sample.pdf")
      .getDownloadURL()
      .then((url) => {
        //   if fetch was resolved
        URL = url;
        getDocument(URL)
          .promise.then((file:any) => {
            let arr: number[] = [];

            //   get number of pages
            numOfPages = file.numPages;
            console.log("No of Pages: " + file.numPages);

            //   create array for the pages
            for (let i = 0; i < numOfPages; i++) {
              arr.push(i);
            }

            //   extract images for each pages
            arr.forEach((element) => {
              file
                .getPage(element + 1)
                .then((page:any) => {
                  console.log(page);
                  const canvas = document.createElement("canvas");
                  let options: any;
                  const context: any = canvas.getContext("2d");
                  options = page.getViewport({ scale: 1 });
                  canvas.height = options.height;
                  canvas.width = options.width;
                  base.current?.appendChild(canvas);
                  page.render({ canvasContext: context, viewport: options }).promise.then(()=>{
                    
                    console.log("page rendered");
                  }).catch((e:any)=>{console.error(e)});
                
                  images.push(canvas.toDataURL());
                  canvas.remove();
                })
                .catch((e:any) => {
                  console.error(e);
                });
            });

            //set images array
            console.log(images);
            setImagesArray([...images]);
          })
          .catch((e:any) => console.error(e));
      })
      .catch((err) => console.error(err));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Render PDF</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton onClick={() => showPDF()}>Show Pdf</IonButton>
        {imagesArray.map((image, index) => {
          return (
            <IonCard>
              <IonImg src={image} key={index}></IonImg>
            </IonCard>
          );
        })}
        {/* <img src={image} alt="" /> */}
        {/* <div ref={base}></div> */}
        {/* <canvas ref={canvas}></canvas> */}
      </IonContent>
    </IonPage>
  );
};

export default ConvertPDF;
