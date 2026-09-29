console.log('index.js connected');

const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then(res => res.json())
        .then(data => displayLessons(data.data));
    // data.data[0].id
}



const displayLessons = (lessons) => {
    // console.log(lessons);
    const levelContainer = document.getElementById('level-contianer');
    levelContainer.innerHTML = '';

    lessons.forEach(lesson => {

        const btnDiv = document.createElement('div');

        btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-soft lesson-btn"><i class="fa-solid fa-book-open"></i> ${lesson.lessonName
            } -${lesson.level_no}</button>`;

        levelContainer.appendChild(btnDiv);

    })
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayLevelWord(data.data);
            activeSelector(id);
        })
}

const activeSelector = (id) => {
    const lessonButtons = document.getElementsByClassName('lesson-btn');
    for (const btn of lessonButtons) {
        btn.classList.add('btn-soft');
    }
    document.getElementById(`lesson-btn-${id}`).classList.remove('btn-soft');
}

const displayLevelWord = (words) => {
    // console.log(words);

    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';


    if (words.length == 0) {
        // alert('no words');

        wordContainer.innerHTML = `<div class="text-center col-span-full space-y-4 font-bangla">
                <img class="mx-auto" src="../english-janala-resources/assets/alert-error.png" alt="No vocabulary available" />
                <p class="text-gray-600">
                    এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                </p>
                <h2 class="text-4xl font-medium">
                    নেক্সট Lesson এ যান
                </h2>
            </div>`;

        return;
    }

    words.forEach(word => {
        // console.log(word);

        const card = document.createElement('div');
        const modal = document.createElement('div');

        card.innerHTML = `<div class="bg-white text-center rounded-xl p-5 shadow-sm">
                <h2 class="text-xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
                <p class="text-sm text-[#777777]">${word.pronunciation ? word.pronunciation : "পাওয়া যায় নি"
            }</p>
                <div class="my-4">${word.meaning ? word.meaning : "পাওয়া যায় নি"
            }</div>
                <div class="flex justify-between">
                    <div onclick="loadWordDetail(${word.id})" class="bg-[#1A91FF]/10 rounded p-2"><i class="fa-solid fa-circle-info"></i></div>
                    <div class="bg-[#1A91FF]/10 rounded p-2"><i class="fa-solid fa-volume-high"></i></div>
                </div>

            </div>`


        wordContainer.appendChild(card);


    })

}


const loadWordDetail = async (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayWordDetails(data.data);
}

const displayWordDetails = (word) => {
    // console.log(word);
    const detailsContainer = document.getElementById('details-container');

    detailsContainer.innerHTML = `
        <div class="p-4 bg-white rounded-xl">
                        <div class="border rounded-xl text-left p-6 border-[#d5d3d3] shadow-sm">
                            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
                            </h2>
                            <div class="my-5 space-y-1">
                                <h2 class="font-bold">Meaning</h2>
                                <p>${word.meaning}</p>
                            </div>
                            <div class="space-y-1 mb-5">
                                <h2>Example</h2>
                                <p>${word.sentence}</p>
                            </div>
                            <div>
                                <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
                                <div class="flex gap-4">
                                    ${createElements(word.synonyms)}
                                </div>
                            </div>

                        </div>
                        <button class="btn btn-primary my-3 rounded-xl">Complete Learning</button>
                    </div>
    `

    my_modal_2.showModal();

}

const createElements = (arr) => {
    console.log(arr);
    if (arr.length == 0) {
        return `<p> No synonyms available </p>`
    } else {
        const htmlElemets = arr.map(el => `<button class="btn bg-">${el}</button>`);
        return htmlElemets.join(" ");
    }
}


loadLessons();