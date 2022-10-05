
/*Efekt divlerini seç 
---
 Select effect divs */
 let filterA = document.getElementById("blur");
 let filterB = document.getElementById("contrast");
 let filterC = document.getElementById("hue-rotate");
 let filterD = document.getElementById("sepia");
 let filterE = document.getElementById("grey");
 let filterF = document.getElementById("brightness");
 saveImgBtn = document.querySelector(".save-img");
 let rotate = 0, flipHorizontal = 1, flipVertical = 1;
 
 /* Rotasyon divlerini seç --  Select rotation divs */
 
 let noFlipBtn = document.getElementById("no-flip");
 let flipXBtn = document.getElementById("flip-x");
 
 //Select button and image
 let uploadButton = document.getElementById("upload-button");
 let image = document.getElementById("chosen-image");
 
 /* 
 Tüm değerleri sırasıyla sıfırlar ---  All values ​​reset
  */
 
 function resetFilter(){
     filterA.value = "0";
     filterB.value = "0";
     filterC.value = "0";
     filterD.value = "0";
     filterE.value = "0";
     filterF.value = "0";
 
     noFlipBtn.checked = true;
     addFilter();
     flipImage();
 }
 
 
 /*Butona tıklandığında filtreleri resetler, 
 image container alanını block eleman yapar,
  seçilen dosyayı yükler. */
 
 /*When the button is clicked,
  it resets the filters, makes the image container field a block element,
   loads the selected file */
 
 uploadButton.onchange = () => {
     resetFilter();
     document.querySelector(".image-container").style.display = "block";
     let reader = new FileReader();
     reader.readAsDataURL(uploadButton.files[0]);
     reader.onload = () => {
         image.setAttribute("src", reader.result);
     }
 }
 
 
 //Filtre Ekleme Fonksiyonu -- Add Filter Function
 function addFilter(){
 
     image.style.filter = `blur(${filterA.value}px) contrast(${filterB.value}%) hue-rotate(${filterC.value}deg)
      grayscale(${filterE.value}%)  brightness(${filterF.value}%) sepia(${filterD.value}%) `;
 
 }
 
 //Those with the rangeType class add those in the function
 //rangeType classına sahip olanları fonksiyondakileri ekler
 let range = document.querySelectorAll(".rangeType");
 
 for (let i = 0; i < range.length; i++) {
     range[i].addEventListener("input", addFilter);
   }
 
 ;
 
 
 //Mirror Effect - Ayna Efekti
 
 let radioBtns = document.querySelectorAll(".flip-buttons input[type='radio']");
 radioBtns.forEach( radioBtn => {
     radioBtn.addEventListener("click", flipImage);
 });
 
 /* CSS işlevi , bir öğeyi x ekseni boyunca  yeniden boyutlandıran bir dönüşüm tanımlar .
  Bunun sonucu bir veri türüdür. scaleX() <transform-function> */
 function flipImage(){
     if(flipXBtn.checked){
     image.style.transform = "scaleX(-1)";
     flipHorizontal=-1;}
 
     else if(noFlipBtn.checked){
         image.style.transform = "scaleX(1)";
         flipHorizontal=1;
     }
 }
 
 // Save Image - Kaydetme
 
 const saveImage = () => {
     console.log("saas");
     const canvas = document.createElement("canvas");
     const ctx = canvas.getContext("2d");
     canvas.width = image.naturalWidth;
     canvas.height = image.naturalHeight;
     
     ctx.filter =    `blur(${filterA.value}px) contrast(${filterB.value}%) hue-rotate(${filterC.value}deg)
     grayscale(${filterE.value}%)  brightness(${filterF.value}%) sepia(${filterD.value}%) `;
     ctx.translate(canvas.width / 2, canvas.height / 2);
 
     ctx.scale(flipHorizontal, 1);
     ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
     
     const link = document.createElement("a");
     link.download = "newImage.jpg";
     link.href = canvas.toDataURL();
     link.click();
 }
 
 saveImgBtn.addEventListener("click", saveImage);
 
 