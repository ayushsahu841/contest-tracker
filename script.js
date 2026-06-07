let contests = [];

//STORAGE
function getSavedContests(){

    return JSON.parse(
        localStorage.getItem(
            "myContests"
        )
    ) || [];

}

const myContestsLink =
    document.getElementById(
        "my-contests-link"
    );
    function updateContestCount(){

        const myContests =
            getSavedContests();
    
        myContestsLink.textContent =
            `My Contests (${myContests.length})`;
    
    }





//DOM ELEMENTS
const container =
    document.getElementById("contest-container");


//API
async function loadContests() {

        const response = await fetch(
            "https://clist.by/api/v4/contest/?upcoming=true&format=json&username=ayushsahu841&api_key=b9667335833c1fdfa515011eb3cd6b35fb3234f2"
        );
    
        const data = await response.json();
     
    
        contests = data.objects.map(function(contest){
    
            return {
    
                platform:
                    contest.resource,
    
                name:
                    contest.event,
    
                startTime:
                    new Date(
                        contest.start
                    ).getTime() / 1000,
    
                duration:
                    contest.duration,
    
                url:
                    contest.href
    
            };
    
        });

        contests.sort(function(a,b){

            return a.startTime - b.startTime;
        
        });
    
      
    
        renderContests(contests);
    
    }
updateContestCount();

loadContests();

//DOM
const searchInput =
    document.getElementById("search-input");
    searchInput.addEventListener(
        "input",
        function(){
    
            const searchText =
                searchInput.value
                .toLowerCase();
    
            const filteredContests =
                contests.filter(
                    function(contest){
    
                        return (
                            contest.name
                                .toLowerCase()
                                .includes(searchText)
                        
                            ||
                        
                            contest.platform
                                .toLowerCase()
                                .includes(searchText)
                        );
    
                    }
                );
    
            if(
                tableContainer.style.display
                === "block"
            ){
    
                renderTable(
                    filteredContests
                );
    
            }
            else{
    
                renderContests(
                    filteredContests
                );
    
            }
    
        }
    );


//UI RENDERING
function renderContests(contestsToShow) {

    container.innerHTML = "";

    for(let i = 0; i < contestsToShow.length; i++) {

      
        const card =
            document.createElement("div");

        card.classList.add("card");

        let cardColor =
"linear-gradient(135deg,#1e293b,#334155)";


card.style.background =
getPlatformColor(
    contestsToShow[i].platform
);

        const startDate =

    new Date(

        contestsToShow[i].startTime * 1000

    );

    let myContests =
    getSavedContests();

const alreadySaved =
    myContests.find(function(contest){

        return contest.name ===
            contestsToShow[i].name;

    });

    card.innerHTML = `

        <p class="platform-badge">
            ${contestsToShow[i].platform}
        </p>

        <h3>${contestsToShow[i].name}</h3>
    
        <p>
            Starts On:
            ${startDate.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            )}
        </p>
    
        <p>
            Duration:
            ${Math.floor(
                contestsToShow[i].duration / 3600
            )} Hours
        </p>
    <div class="card-buttons">
        <button class="register-btn">
            Register
        </button>
    
        <button class="save-btn">

    ${
        alreadySaved
        ? "✓ Saved"
        : "Save"
    }

</button>
    </div>
    
    `;

        const registerBtn =
            card.querySelector(".register-btn");

        const saveBtn =
            card.querySelector(".save-btn");

            if(alreadySaved){

                saveBtn.disabled = true;
            
            }

        registerBtn.addEventListener("click", function() {

            window.open(
                contestsToShow[i].url,
                "_blank"
            );

        });

        saveBtn.addEventListener("click", function() {

            let myContests =
getSavedContests();

            const alreadyExists =
                myContests.find(function(contest) {

                    return contest.name ===
                        contestsToShow[i].name;

                });

            if(alreadyExists) {

                alert("Contest Already Registered!");

            } else {

                myContests.push(
                    contestsToShow[i]
                );

                localStorage.setItem(
                    "myContests",
                    JSON.stringify(myContests)
                );

                updateContestCount();
                
                saveBtn.textContent =
                    "✓ Saved";

                saveBtn.disabled = true;

                alert("Contest Saved!");
            }
        });

        container.appendChild(card);
    }
}

//DOM ELEMENTS
const allBtn =
document.getElementById("all-btn");

const cfBtn =
document.getElementById("cf-btn");

const lcBtn =
document.getElementById("lc-btn");

const ccBtn =
document.getElementById("cc-btn");

const acBtn =
document.getElementById("ac-btn");

const kaggleBtn =
document.getElementById("kaggle-btn");



function resetButtons(){

    allBtn.textContent = "All";
    cfBtn.textContent = "Codeforces";
    lcBtn.textContent = "LeetCode";
    ccBtn.textContent = "CodeChef";
    acBtn.textContent = "AtCoder";
    kaggleBtn.textContent = "Kaggle";

}

function setActiveButton(activeBtn){

    resetButtons();

    activeBtn.textContent =
    "✓ " + activeBtn.textContent;

}

allBtn.addEventListener("click", function(){

    setActiveButton(allBtn);
    filterPlatform("all");

});

cfBtn.addEventListener("click", function(){

    setActiveButton(cfBtn);

    filterPlatform("codeforces");

});

lcBtn.addEventListener("click", function(){

    setActiveButton(lcBtn);

    filterPlatform("leetcode");

});

ccBtn.addEventListener("click", function(){

    setActiveButton(ccBtn);

    filterPlatform("codechef");

});

acBtn.addEventListener("click", function(){

    setActiveButton(acBtn);

    filterPlatform("atcoder");

});

kaggleBtn.addEventListener("click", function(){

    setActiveButton(kaggleBtn);

    filterPlatform("kaggle");

});

// Default selected button

setActiveButton(allBtn);

const tableBtn =
document.getElementById("table-view-btn");

const cardsContainer =
document.getElementById("contest-container");

const tableContainer =
document.getElementById("table-container");

tableBtn.addEventListener(
    "click",
    function(){

        setActiveView("table");

        cardsContainer.style.display =
        "none";

        tableContainer.style.display =
        "block";

        renderTable(contests);

    }
);

const cardBtn =
document.getElementById("card-view-btn");

cardBtn.addEventListener(
    "click",
    function(){

        setActiveView("card");

        tableContainer.style.display =
            "none";

        cardsContainer.style.display =
            "flex";

    }
);


//UI RENDERING
function renderTable(contestsToShow){

    const tableContainer =
    document.getElementById(
        "table-container"
    );

    tableContainer.innerHTML = `

        <table class="contest-table">

            <thead>

                <tr>

                    <th>Platform</th>

                    <th>Contest</th>

                    <th>Date</th>

                    <th>Duration</th>

                    <th>Starts In</th>

                    <th>Open</th>

                    <th>Save</th>

                </tr>

            </thead>

            <tbody>

            </tbody>

        </table>

    `;

    const tbody =
    tableContainer.querySelector(
        "tbody"
    );

    contestsToShow.forEach(function(contest){

        const startDate =
        new Date(
            contest.startTime * 1000
        );

        const row =
        document.createElement("tr");

        row.innerHTML = `

            <td>${contest.platform}</td>

            <td>${contest.name}</td>

            <td>
    ${startDate.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    )}
</td>

            <td>
                ${Math.floor(
                    contest.duration / 3600
                )}h
            </td>

            <td>
                ${getTimeLeft(
                    contest.startTime
                )}
            </td>

            <td>

                <a
                href="${contest.url}"
                target="_blank">

                    Open

                </a>

            </td>

           <td>

    <button
        class="table-save-btn">

        ${
            getSavedContests().find(
                item => item.name === contest.name
            )
            ? "✓ Saved"
            : "Save"
        }

    </button>

</td>

        `;

        tbody.appendChild(row);

        const saveBtn =
row.querySelector(".table-save-btn");

const alreadySaved =
getSavedContests().find(
    item => item.name === contest.name
);

if(alreadySaved){

    saveBtn.disabled = true;

}

saveBtn.addEventListener(
    "click",
    function(){

        let myContests =
        getSavedContests();

        myContests.push(contest);

        localStorage.setItem(
            "myContests",
            JSON.stringify(myContests)
        );

        saveBtn.textContent =
        "✓ Saved";

        saveBtn.disabled = true;

        updateContestCount();

    }
);

    });

}


//HELPERS
function getPlatformColor(platform){

    if(platform.includes("codeforces"))
        return "linear-gradient(135deg,#3b82f6,#06b6d4)";

    if(platform.includes("leetcode"))
        return "linear-gradient(135deg,#f59e0b,#ef4444)";

    if(platform.includes("codechef"))
        return "linear-gradient(135deg,#10b981,#059669)";

    if(platform.includes("atcoder"))
        return "linear-gradient(135deg,#8b5cf6,#ec4899)";

    if(platform.includes("kaggle"))
        return "linear-gradient(135deg,#00a6ff,#0072ff)";

    return "linear-gradient(135deg,#1e293b,#334155)";
}

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

function filterPlatform(platformName){

    let filtered;

    if(platformName === "all"){

        filtered = contests;

    }
    else{

        filtered = contests.filter(function(contest){

            return contest.platform
                .includes(platformName);

        });

    }

    if(tableContainer.style.display === "block"){

        renderTable(filtered);

    }
    else{

        renderContests(filtered);

    }

}

function setActiveView(view){

    cardBtn.textContent =
        "Card View";

    tableBtn.textContent =
        "Table View";

    if(view === "card"){

        cardBtn.textContent =
            "✓ Card View";

    }
    else{

        tableBtn.textContent =
            "✓ Table View";

    }

}

