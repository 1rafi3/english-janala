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

        btnDiv.innerHTML = `<button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-soft"><i class="fa-solid fa-book-open"></i> ${lesson.lessonName
            } -${lesson.level_no}</button>`;

        levelContainer.appendChild(btnDiv);

    })
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data))
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
        console.log(word);

        const card = document.createElement('div');

        card.innerHTML = `<div class="bg-white text-center rounded-xl p-5 shadow-sm">
                <h2 class="text-xl font-bold">${word.word}</h2>
                <p class="text-sm text-[#777777]">${word.pronunciation
            }</p>
                <div class="my-4">${word.meaning
            }</div>
                <div class="flex justify-between">
                    <div class="bg-[#1A91FF]/10 rounded p-2"><i class="fa-solid fa-circle-info"></i></div>
                    <div class="bg-[#1A91FF]/10 rounded p-2"><i class="fa-solid fa-volume-high"></i></div>
                </div>

            </div>`

        wordContainer.appendChild(card);

    })
}



loadLessons();