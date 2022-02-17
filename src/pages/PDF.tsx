import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { pdfStorageRef, samplePDFRef } from "../components/Firebase";
import { getDocument } from "pdfjs-dist/legacy/build/pdf";
import { GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.131/build/pdf.worker.min.js";

const PDF: React.FC = () => {
  const input = useRef<HTMLInputElement>(null);
  const pdfImage = useRef<HTMLIonImgElement>(null);
  const [imgFile, setImgFile] = useState<any[]>([]);

  function uploadFile(file: any) {
    samplePDFRef.put(file).then((snapshot) => {
      console.log("file uploaded");
    });
  }

  //param: file -> the input file (e.g. event.target.files[0])
  //return: images -> an array of images encoded in base64
  const convertPdfToImages = (file: string) => {
    const images: any[] = [];

    getDocument(file)
      .promise.then((pdfFile) => {
        let options: any;
        const canvas = document.createElement("canvas");
        console.log("No of Pages: " + pdfFile.numPages);
        for (let i = 0; i < pdfFile.numPages; i++) {
          // eslint-disable-next-line no-loop-func
          pdfFile
            .getPage(i + 1)
            // eslint-disable-next-line no-loop-func
            .then((p) => {
              options = p.getViewport({ scale: 1 });
              const context: any = canvas.getContext("2d");
              canvas.height = options.height;
              canvas.width = options.width;
              p.render({ canvasContext: context, viewport: options });
              images.push(canvas.toDataURL());
              canvas.remove();
            })
            .catch((err) => {
              console.error(err);
            });
        } 
      })
      .catch((err) => {
        console.error(err);
      });
    return images;
  };

  function showPDF() {
    let fileArray: any[];
    pdfStorageRef
      .child("files/sample.pdf")
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        fileArray = convertPdfToImages(url);
        console.log(fileArray[0]); 
        pdfImage.current?.setAttribute("src",fileArray[0])
        console.log(fileArray[0])
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
        <IonButton
          onClick={() => {
            let file = input.current?.files;
            uploadFile(file?.item(0));
          }}
        >
          Upload File
        </IonButton>
        <IonButton onClick={() => showPDF()}>Show Pdf</IonButton>
        <input
          name="filetobase64"
          type="file"
          ref={input}
          accept="application/pdf"
          onChange={(e) => {
            let file = input.current?.files;
            // console.log(convertPdfToImages(file?.item(0)));
          }}
        ></input> 
        <IonCard>
          <IonImg ref={pdfImage}></IonImg>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PDF;

interface params {
  canvasContext: any;
  viewport: {
    height: any;
    width: any;
  };
}
