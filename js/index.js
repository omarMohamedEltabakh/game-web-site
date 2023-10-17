const mmorpg = document.getElementById("mmorpg");
mmorpg.style.color = "#0296c9";
mmorpg.style.color = "#0296c9";
let allDataForGame;

// start class games
class Games {
  constructor() {
    const allCategory = document.querySelectorAll("ul li");
    for (let i = 0; i < allCategory.length; i++) {
      allCategory[i].addEventListener("click", async (e) => {
        document.querySelector(".loading").classList.remove("d-none");
        e.target.style.color = "#0296c9";
        const test = e.target.getAttribute("id");
        $(`#${test}`).siblings().css("color", "white");
        setTimeout(async() => {
        document.querySelector(".loading").classList.add("d-none");


        allDataForGame = await this.getData(e.target.innerHTML);
            
        }, 500);

        set.displayGame();
        console.log(allDataForGame);
        allDataForGame = await this.getData(e.target.innerHTML);
      });
      
         document.querySelector(".loading").classList.remove("d-none");
        
        setTimeout(() => {
            document.querySelector(".loading").classList.add("d-none");
        
        (async () => {
          allDataForGame = await this.getData("mmorpg");
          set.displayGame();
        })();
      }, 500);
    }
    const set = new setData();
  }

  async getData(category) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const response = await api.json();
    return response;
  }
}
// end class games







// start class setDate
class setData {
  constructor() {}
  displayGame() {
    let game = ``;
    for (let i = 0; i < allDataForGame.length; i++) {
      game += `
        <div  class="col-md-3 pt-4   carta ">
                <div class="item px-3 py-3  card ">
                
                    <img id='${allDataForGame[i].id}' class="w-100 img" src="${allDataForGame[i].thumbnail}" alt="">
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <p class="text-white">$${allDataForGame[i].title}</p>
                        <p class=" text-center text-white free">free</p>
                    </div>
                    
                    <p id='${allDataForGame[i].id}' class="text-center discripion ">${allDataForGame[i].short_description}</p>
                    <div class="d-flex justify-content-between align-items-center ">
                        <p class="cartafooter text-center">${allDataForGame[i].genre}</p>
                        <p class="cartafooter text-center">${allDataForGame[i].platform}</p>
                    </div>
                </div>
            </div>
`;
    }

    document.querySelector(".row").innerHTML = game;
  }
}
// end class setDate
const game = new Games();











// start class detail
class Detail {
  constructor() {
    this.getId();
  }

  getId() {
    const cardContainer = document.querySelectorAll("#card");
    for (let i = 0; i < cardContainer.length; i++) {
      cardContainer[i].addEventListener("click", async (e) => {
        const id = e.target.getAttribute("id");

        const finalDetails = await this.getDetails(id);
        console.log(finalDetails);
        document.querySelector(".loading").classList.remove("d-none");
        setTimeout(() => {
            document.querySelector(".loading").classList.add("d-none");
            this.diplayDetails(finalDetails);
        }, 500);
        
      });
    }
  }
  async getDetails(id) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    const finalRes = await response.json();
    return finalRes;
  }
  diplayDetails(finalDetails) {
    let details = `
            <div class="container">
                <div class="row mt-4">
                    <h4 class="text-white">Details Game</h4>

                    <div class="col-md-4 mt-2">
                        <img class="w-100" src="${finalDetails.thumbnail}" alt="">
                    </div>
                    <div class="col-md-8 text-white  mt-2">
                        <h5 class= 'fs-3'>Title:${finalDetails.title}</h5>
                        <p >Category:<span class="backGround ms-1">${finalDetails.genre}</span></p>
                        <p >Platform:<span class="backGround ms-1">${finalDetails.platform}</span></p>
                        <p  >Status:<span class="backGround ms-1">${finalDetails.status}</span></p>
                        <p class="paragraphForDetalis">${finalDetails.description}</p>
                            <a target="_blank" href="${finalDetails.game_url}"  class="btn btn-outline-warning text-white">Show game</a>
                        </div>
                        
                    </div>
                    <i id='close' class="btn-close  btn-close-white"></i>
            </div>
        `;

    const detailsContainer = document.getElementById("details");
    detailsContainer.style.display = "flex";
    detailsContainer.innerHTML = details;

    $("#close").click(function (e) {
      detailsContainer.style.display = "none";
    });
  }
}
// end class detail
const omar = new Detail();
