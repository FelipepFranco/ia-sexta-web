const button = document.getElementById('button--ask')

const consultaIA = async (question) => {
    const keyGoogle = 'AIzaSyBZaybh57iVi23jcLvzuIrabNG4f3td60A'
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + keyGoogle

    const requestData = {
        contents: [
            {
                parts:[
                    {
                        text: `${question}`
                    }
                ]
            }
        ]
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }

    await fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
        const answerIa = data.candidates[0].content.parts[0].text
        separaEpesquisa(answerIa)
        respostaIa(answerIa)
    })
}

const respostaIa = (answerIaPt) => {
    const answerPt = document.getElementById('area--pt')
    answerPt.value = answerIaPt

}

const separaEpesquisa = async (AItext) => AItext.match(/.{1,500}/g).forEach(async (part) => await traduz(part));



const traduz = async (AItext) => {
    const url = `https://api.mymemory.translated.net/get?q=${AItext}!&langpair=pt-br|en`;
    const response = await fetch(url);
    const data = await response.json();
    insereTraducao(data.responseData.translatedText)
} 

const insereTraducao = (textoTraduzido) => {
    const answerPt = document.getElementById('area--en')
    answerPt.value = answerPt.value + textoTraduzido
}

button.addEventListener('click', () => {
    const question = document.getElementById('ask--user').value
    consultaIA(question)
})
