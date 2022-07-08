import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void  {

    var buildUrl = "Build";
   
    var loaderUrl = buildUrl + "/demo.loader.js";
    var config = {
      dataUrl: buildUrl + "/demo.data",
      frameworkUrl: buildUrl + "/demo.framework.js",
      codeUrl: buildUrl + "/demo.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "JoeMoceri",
      productName: "Unity Effects Pack",
      productVersion: "0.1",
      devicePixelRatio: 1,
    };

    var container = <HTMLVideoElement>document.querySelector("#unity-container");
    var canvas = <HTMLVideoElement>document.querySelector("#unity-canvas");
    var loadingBar = <HTMLVideoElement>document.querySelector("#unity-loading-bar");
    var progressBarFull = <HTMLVideoElement>document.querySelector("#unity-progress-bar-full");
    var fullscreenButton = <HTMLVideoElement>document.querySelector("#unity-fullscreen-button");
    var mobileWarning = <HTMLVideoElement>document.querySelector("#unity-mobile-warning");

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
      config.devicePixelRatio = 1;
      mobileWarning.style.display = "block";
      setTimeout(() => {
        mobileWarning.style.display = "none";
      }, 5000);
    } else {
      canvas.style.width = "960px";
      canvas.style.height = "600px";
      
    }
    loadingBar.style.display = "block";
 
    var script = document.createElement("script");
    script.src =loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress: number) => {
        progressBarFull.style.width = 100 * progress + "%";
      }).then((unityInstance: { SetFullscreen: (arg0: number) => void; }) => {
        loadingBar.style.display = "none";
        
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
          
        };
      }).catch((message: any) => {
        alert(message);
      });

  }

}}

