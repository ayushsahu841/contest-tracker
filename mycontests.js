function getTimeLeft(startTime){

    const now =
        Date.now() / 1000;

    const diff =
        startTime - now;

    if(diff <= 0){

        return "Started";

    }

    const days =
        Math.floor(diff / 86400);

    if(days > 0){

        return days + " Days";

    }

    const hours =
        Math.floor(diff / 3600);

    return hours + " Hours";

}


const container =
document.getElementById(
    "my-contests-container"
);

// Get saved contests from browser

const myContests =
JSON.parse(
    localStorage.getItem("myContests")
) || [];

console.log(myContests);

if(myContests.length === 0){

    container.innerHTML = `

        <h2
        style="
        text-align:center;
        margin-top:60px;">

            No Saved Contests Yet 🚀

        </h2>

    `;

}

// Find container



// Loop through saved contests

for(let i=0;i<myContests.length;i++){

    const card =
    document.createElement("div");

    card.classList.add("card");

    const diffDays =

(
    myContests[i].startTime -
    Date.now()/1000
)
/
86400;

if(diffDays <= 0){

    card.style.background =
    "#d1d5db"; // gray

}
else if(diffDays < 1){

    card.style.background =
    "#ef4444"; // red

}

else if(diffDays < 3){

    card.style.background =
    "#fed7aa";

}

else if(diffDays < 7){

    card.style.background =
    "#fef3c7";

}

else{

    card.style.background =
    "#dcfce7";

}

    card.innerHTML = `

    <p class="platform-badge">
        ${myContests[i].platform}
    </p>

    <h3>
        ${myContests[i].name}
    </h3>

    <p>
        📅 Starts In:
        ${getTimeLeft(
            myContests[i].startTime
        )}
    </p>

    <p>
        ⏱ Duration:
        ${Math.floor(
            myContests[i].duration / 3600
        )} Hours
    </p>

    <div class="card-buttons">

        <button
            class="open-btn">

            Open

        </button>

        <button
            class="remove-btn">

            Remove

        </button>

    </div>

`;

const removeBtn =
card.querySelector(".remove-btn");

const openBtn =
card.querySelector(".open-btn");

openBtn.addEventListener(
    "click",
    function(){

        window.open(
            myContests[i].url,
            "_blank"
        );

    }
);


    // When clicked

    removeBtn.addEventListener("click", function(){

        // Remove contest from array

        myContests.splice(i,1);

        // Save updated array

        localStorage.setItem(

            "myContests",

            JSON.stringify(myContests)

        );

        // Refresh page

        location.reload();

    });

    container.appendChild(card);

}


