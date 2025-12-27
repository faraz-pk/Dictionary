const inputEl = document.querySelector('input');
const infoCont = document.querySelector('.info');
const wordTitle = document.querySelector('.word');
const meaningEl = document.querySelector('.meaning');
const audioEl = document.querySelector('audio');

async function fetchData(word) {
    infoCont.style.display = "block";
    wordTitle.innerText = 'Searching';
    try {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());
        
        if (result.title) {
            infoCont.style.display = "block";
            wordTitle.innerText = word;
            meaningEl.innerText = "N/A";
            audioEl.style.display = "none";
          } else {
            infoCont.style.display = "block";
            audioEl.style.display = "inline-flex";
            wordTitle.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
          }
    } catch (error) {
        infoCont.style.display = 'block';
        infoCont.innerText = 'Check your internet connection and try again';
    }
}

inputEl.addEventListener('keyup', (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchData(e.target.value);
    }
});
