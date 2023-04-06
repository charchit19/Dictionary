const wrapper = document.querySelector(".wrapper"),
    searchInput = wrapper.querySelector("input"),
    synonyms = wrapper.querySelector(".synonyms .list"),
    infoText = wrapper.querySelector(".info-text"),
    volumeIcon = wrapper.querySelector(".word i"),
    removeIcon = wrapper.querySelector(".search span");
let audio;
let r = undefined;
let x = undefined;
let z = undefined;
let l = undefined;



function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Can't find the meaning of <span> "${word}" </span>. Please try again.`
    }
    else {
        console.log(result);
        wrapper.classList.add("active");
        console.log(result[0].word);
        // let definitions = result[0].meanings[0].definitions[0];

        // let x = undefined;
        for (let y = 0; y < result[0].meanings.length; y++) {
            for (let g = 0; g < result[0].meanings[y].definitions.length; g++) {
                {
                    if (result[0].meanings[y].definitions[g].example != undefined) {
                        x = y;
                        l = g;
                        break;
                    }
                }
            }
        }
        console.log("l = ",l);
        console.log("x = ",x);
        // for (let j = 0; j < result[0].meanings.length; j++) {
        //     if (result[0].meanings[j].example != undefined && result[0].meanings[j].example != '') {
        //         l = j;
        //         console.log(result[0].meanings[j].example)
        //         break;
        //     }
        // }
        phonetics = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerHTML = result[0].word;
        document.querySelector(".word span").innerHTML = phonetics;
        document.querySelector(".meaning span").innerHTML = result[0].meanings[x].definitions[l].definition;
        document.querySelector(".example span").innerHTML = result[0].meanings[x].definitions[l].example;
        for (let y = 0; y < result[0].meanings.length; y++) {
            if (result[0].meanings[y].synonyms[0] != undefined) {
                r = y;
                console.log(result[0].meanings[y].synonyms[0])
            }
        }
        if (r == undefined) {
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                let tag = `<span onclick=search('${result[0].meanings[r].synonyms[i]}')>${result[0].meanings[r].synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
            r = undefined;
        }
    }
    for (let y = 0; y < result[0].phonetics.length; y++) {
        if (result[0].phonetics[y].audio != undefined && result[0].phonetics[y].audio != '') {
            z = y;
            console.log(result[0].phonetics[y].audio)
            break;
        }
    }
    console.log("z : ");
    console.log(z);
    audio = new Audio(result[0].phonetics[z].audio);
    console.log("audio: ")
    console.log(audio)
    console.log(result);
}

function search(word) {
    searchInput.value = word;
    fetchApi(word);
    wrapper.classList.remove("active");
}


//fetch api function
function fetchApi(word) {
    r = undefined;
    x = undefined;
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result, word));
    console.log("hy23")

}

searchInput.addEventListener("keyup", e => {
    if (e.key == "Enter" && e.target.value) {
        fetchApi(e.target.value);
        console.log("hy22")
    }
})

volumeIcon.addEventListener("click", () => {
    audio.play();
})

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9a9a9a";
    infoText.innerHTML = `Type a word and press enter to get meaning, examples, pronunciation, and synonyms of
    that word.`;
})