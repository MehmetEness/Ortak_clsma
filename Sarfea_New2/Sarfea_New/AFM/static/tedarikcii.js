document.getElementById("tedarikci-ac").addEventListener("click", function(){

        document.querySelector(".tedarikciWindow").style.display = "flex";
});
document.getElementById("tedarikci-modal").addEventListener("click", function(){
    document.querySelector(".tedarikciWindow").style.display = "none";
});


// let isFileInput = document.getElementById("is-file-input");
// let isFileList = document.getElementById("is-files-list");
// let isNumOfFiles = document.getElementById("is-num-of-files");
// isFileInput.addEventListener("change", () => {
//     isFileList.innerHTML = "";
//     isNumOfFiles.textContent = `${isFileInput.files.length} Files Selected`;
//   for (i of isFileInput.files) {
//     let reader = new FileReader();
//     let listItem = document.createElement("li");
//     let fileName = i.name;
//     let fileSize = (i.size / 1024).toFixed(1);
//     listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
//     if (fileSize >= 1024) {
//       fileSize = (fileSize / 1024).toFixed(1);
//       listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
//     }
//     isFileList.appendChild(listItem);
//   }
// });