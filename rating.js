function getSavedHandles(){

    return JSON.parse(
        localStorage.getItem(
            "savedHandles"
        )
    ) || [];

}

function saveHandles(data){

    localStorage.setItem(
        "savedHandles",
        JSON.stringify(data)
    );

}

const platformSelect =
document.getElementById(
    "platform"
);

const handleInput =
document.getElementById(
    "handle-input"
);

const saveBtn =
document.getElementById(
    "save-handle-btn"
);



async function getCodeforcesData(handle){

        const response =
            await fetch(
                `https://codeforces.com/api/user.info?handles=${handle}`
            );
    
        const data =
            await response.json();
    
        const user =
            data.result[0];
    
        const handleData = {
    
            platform:
                "Codeforces",
    
            handle:
                user.handle,
    
            rating:
                user.rating,
    
            maxRating:
                user.maxRating,
    
            rank:
                user.rank
    
        };
    
        let savedHandles =
            getSavedHandles();
    
            const alreadyExists =
            savedHandles.find(
                function(item){
            
                    return item.platform ===
                    handleData.platform;
            
                }
            );
            
            if(!alreadyExists){
            
                savedHandles.push(
                    handleData
                );
            
                saveHandles(
                    savedHandles
                );
            
            }
    
        saveHandles(
            savedHandles
        );
        renderHandles();
    
        console.log(
            savedHandles
        );
    
}


saveBtn.addEventListener(
    "click",
    function(){

        const platform =
            platformSelect.value;

        const handle =
            handleInput.value;

        console.log(platform);
        console.log(handle);

        if(platform === "codeforces"){

            getCodeforcesData(
                handle
            );
        
        }
        
        else if(platform === "leetcode"){
        
            getLeetCodeData(
                handle
            );
        
        }

    }
);


function renderHandles(){

    const savedHandles =
        getSavedHandles();

    const tbody =
        document.getElementById(
            "rating-body"
        );

    tbody.innerHTML = "";

    savedHandles.forEach(
        function(item){

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${item.platform}</td>

                <td>${item.handle}</td>

                <td>${item.rating}</td>

                <td>${item.maxRating}</td>

                <td>${item.rank}</td>

                <td>

                    <button
    class="remove-btn"
    data-platform="${item.platform}">
    Remove
</button>

                </td>

            `;

            tbody.appendChild(
                row
            );

            const removeBtn =
row.querySelector(".remove-btn");

removeBtn.addEventListener(
    "click",
    function(){

        let savedHandles =
        getSavedHandles();

        savedHandles =
        savedHandles.filter(
            item =>
            item.platform !==
            this.dataset.platform
        );

        saveHandles(
            savedHandles
        );

        renderHandles();

    }
);

        }
    );

}

renderHandles();