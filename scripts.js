document.getElementById('search-button').addEventListener('click', function () {
    const word = document.getElementById('input-box').value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            displayWordData(data);
        })
        .catch(error => {
            console.error('Error fetching the word:', error);
            document.getElementById('result').innerHTML = 'Word not found!';
        });
});

function displayWordData(data) {
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = '';

    if (data && data[0]) {
        const word = data[0].word;
        const phonetic = data[0].phonetic ? `<p>Phonetic: ${data[0].phonetic}</p>` : '';
        const meanings = data[0].meanings.map(meaning => {
            const definitions = meaning.definitions.map(def => `<li>${def.definition}</li>`).join('');
            return `<p><span><strong>${meaning.partOfSpeech}</strong></span></p><ul>${definitions}</ul>`;
        }).join('');

        resultDiv.innerHTML = `<h2>${word}</h2>${phonetic}${meanings}`;
    } else {
        resultDiv.innerHTML = 'No results found.';
    }
}
