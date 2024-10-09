const images = document.querySelectorAll("i");
const textList = document.querySelectorAll("h5");
const stackList = document.querySelectorAll("ul");
const stackDiv = document.querySelectorAll(".stack-div")

const section = {
    "Language": ["Python", "Javascript"],
    "Frontend": ["HTML", "CSS", "Bootstrap", "React"],
    "Backend": ["Django"],
    "Database": ["Postgres", "Sqlite"],
}

images.forEach(image => {
    image.addEventListener("mouseenter", () => {
        if ( image.classList == image.getAttribute("class") ) {
            textList.forEach(text => {
                if ( text.classList.contains(image.id.toLowerCase()) ) {
                    text.classList.add("fade-text");
                    // console.log(text.classList)
                    text.textContent = `${ image.id }`;
                };
            });
            let listItems = ""; // Reset listItems for each event
            section[image.id].forEach(item => {
                listItems += `<li>${ item }</li>`;
            });
            stackList.forEach(item => {
                if ( item.classList.contains(image.id.toLowerCase()) ) {
                    item.classList.add("fade-text");
                    item.innerHTML = listItems;
                };
            });
            // stackList.innerHTML = listItems;
        } 
        // console.log("on");
    }, { once: true }) 
});

// images.addEventListener("mouseenter", () => {
//     if ( images.getAttribute("class").includes("fa-laptop") ) {
//         // images.setAttribute("class", "fa-solid fa-laptop-code fa-2xl mouseOn");
//         textList.textContent = "Languages";
//         for ( const item in section["Language"] ) {
//             listItems += `<li>${section["Language"][item]}</li>`;
//             console.log(item);
//         };
//         stackList.innerHTML = listItems;
//         // document.appendChild(textList);
//         console.log("on");
//     }
//     }, {once: true}
// )

// const imageIds = [];

// // Loop through the NodeList and extract IDs
// images.forEach(image => {
//     if ( image.id ) { // Check if the image has an ID
//         imageIds.push(image.id);
//         // console.log(image.classList)
//     }
// });

// images.addEventListener("mouseleave", () => {
//         textList.textContent = "";
//         console.log("off");
//     }
// )

