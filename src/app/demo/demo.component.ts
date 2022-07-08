import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }



  ngOnInit(): void  {

    var buildUrl = "assets/demo/Build";
    var loaderUrl = buildUrl + "/blueballoon_webgl2.loader.js";
    var config = {
      dataUrl: buildUrl + "/blueballoon_webgl2.data",
      frameworkUrl: buildUrl + "/blueballoon_webgl2.framework.js",
      codeUrl: buildUrl + "/blueballoon_webgl2.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "BlueBallon",
      productVersion: "0.1",
      devicePixelRatio: 0,
      //showBanner: unityShowBanner ,
    };

 
 
    // function unityShowBanner(msg:string, type:string) {
    //     function updateBannerVisibility() {
    //       warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    //     }
    //     var div = document.createElement('div');
    //     div.innerHTML = msg;
    //     warningBanner.appendChild(div);
    //     if (type == 'error') div.style = 'background: red; padding: 10px;';
    //     else {
    //       if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
    //       setTimeout(function() {
    //         warningBanner.removeChild(div);
    //         updateBannerVisibility();
    //       }, 5000);
    //     }
    //     updateBannerVisibility();
    //   }

    let container = document.querySelector("#unity-container") || new Element();
    var canvas : HTMLElement = document.querySelector("#unity-canvas") || new HTMLElement();
    var loadingBar : HTMLElement = document.querySelector("#unity-loading-bar") || new HTMLElement();
    var progressBarFull : HTMLElement = document.querySelector("#unity-progress-bar-full") || new HTMLElement();
    var fullscreenButton : HTMLElement = document.querySelector("#unity-fullscreen-button") || new HTMLElement();
    var warningBanner : HTMLElement = document.querySelector("#unity-warning") || new HTMLElement();



    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
      // Avoid draining fillrate performance on mobile devices,
      // and default/override low DPI mode on mobile browsers.
      config.devicePixelRatio = 1;
      //unityShowBanner('WebGL builds are not supported on mobile devices.','error');
    } else {
      canvas.style.width = "600px";
      canvas.style.height = "700px";
    }
    loadingBar.style.display = "block";

    createUnityInstance(canvas, config, (progress: any) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance: any) => {
      loadingBar.style.display = "none";
      fullscreenButton.onclick = () => {
        unityInstance.SetFullscreen(1);
      };
    }).catch((message: any) => {
      alert(message);
    });

}}


