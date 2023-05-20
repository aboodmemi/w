// const recordButton = document.getElementById('recordButton');
// const output = document.getElementById('output');
// const transcriptOutput = document.getElementById('transcriptOutput'); // صندوق النص المحول
// const recognition = new webkitSpeechRecognition();
// let isRecording = false;
// let isSecondClick = false;

// recordButton.addEventListener('click', () => {
//   isRecording = !isRecording;
//   if (isRecording) {
//     recordButton.classList.add('recording');
//     recognition.start();
//   } else {
//     if (isSecondClick) {
//       recognition.stop();
//       recordButton.classList.remove('recording');
//       isRecording = false;
//       isSecondClick = false;
//     }
//   }
// });

// recordButton.addEventListener('dblclick', () => {
//   isSecondClick = true;
// });

// const images = [
//   '../my_porject_css/image/jordan-1.jpg',
//   '../my_porject_css/image/jordan-2.jpg',
//   '../my_porject_css/image/jordan-3.jpg',
//   '../my_porject_css/image/jordan-4.jpg',
//   '../my_porject_css/image/jordan-5.jpg',
//   '../my_porject_css/image/jordan-6.jpg',
//   '../my_porject_css/image/jordan-7.jpg',
//   '../my_porject_css/image/jordan-8.jpg',
//   '../my_porject_css/image/jordan-9.jpg',
//   '../my_porject_css/image/jordan-10.jpg'
// ];
// let currentImageIndex = 0;

// function changeBackground() {
//   document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;
//   currentImageIndex = (currentImageIndex + 1) % images.length;
// }

// setInterval(changeBackground, 6000);
// // الجزء المعدل
// recognition.lang = 'ar';

// recognition.onresult = (event) => {
//   const transcript = event.results[0][0].transcript;
//   transcriptOutput.textContent = transcript; // تحديث محتوى صندوق النص المحول
//   axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
//     prompt: transcript,
//     max_tokens: 100,
//     temperature: 0.7
//   }, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer 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' // استبدل YOUR_API_KEY بمفتاح الواجهة البرمجية الخاص بك
//     }
//   })
//     .then(response => {
//       const completion = response.data.choices[0].text.trim();
//       output.innerHTML = `<span style="color: red">${completion}</span>`;
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };

// recognition.onend = () => {
//   if (!isSecondClick) {
//     recordButton.classList.remove('recording');
//     isRecording = false;
//   }
// };

// recordButton.addEventListener('click', (event) => {
//   event.stopPropagation();
// });

// recordButton.addEventListener('dblclick', () => {
//   if (isRecording) {
//     recognition.stop();
//     recordButton.classList.remove('recording');
//     isRecording = false;
//   }
// });
// const recordButton = document.getElementById('recordButton');
// const outputDiv = document.getElementById('output');
// let isRecording = false;
// let recognition;

// recordButton.addEventListener('click', () => {
//   if (!isRecording) {
//     recordButton.innerText = 'Stop Recording';
//     isRecording = true;
//     recognition = new webkitSpeechRecognition();
//     recognition.lang = 'ar-AR'; // تغيير لغة التعرف على الكلام إلى العربية
//     recognition.start();

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;

//       sendToChatGPT(transcript);

//       recordButton.innerText = 'Start Recording';
//       isRecording = false;
//       recognition.stop();
//     };
//   } else {
//     recordButton.innerText = 'Start Recording';
//     isRecording = false;
//     recognition.stop();
//   }
// });

// function sendToChatGPT(message) {
//   const body = {
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'system', content: 'You are a user' }, { role: 'user', content: message }],
//   };

//   const headers = {
//     Authorization: 'Bearer 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',
//   };

//   axios
//     .post('https://api.openai.com/v1/chat/completions', body, {
//       headers: headers,
//     })
//     .then((response) => {
//       const reply = response.data.choices[0].message.content;
//       outputDiv.innerText +=  reply;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
const recordButton = document.getElementById('recordButton');
const outputDiv = document.getElementById('output');
let isRecording = false;
let recognition;

recordButton.addEventListener('click', () => {
  if (!isRecording) {
    recordButton.innerText = '';
    isRecording = true;
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'ar-AR'; // تغيير لغة التعرف على الكلام إلى العربية
    recognition.start();
    recordButton.style.backgroundImage = "url('microphone2.png')";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      sendToChatGPT(transcript);

      recordButton.innerText = '';
      isRecording = false;
      recognition.stop();
      recordButton.style.backgroundImage = "url('microphone.png')";
    };
  } else {
    recordButton.innerText = '';
    isRecording = false;
    recognition.stop();
    recordButton.style.backgroundImage = "url('microphone.png')";
  }
});

function sendToChatGPT(message) {
  const body = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'You are a user' }, { role: 'user', content: "رد باللهجه الاردنيه العاميه قدر المستطاع : "+message }],
  };

  const headers = {
    Authorization: 'Bearer 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',
  };
// phone 
  axios
    .post('https://api.openai.com/v1/chat/completions', body, {
      headers: headers,
    })
    .then((response) => {
      const reply = response.data.choices[0].message.content;
      outputDiv.innerText += reply + "\n";
      outputDiv.innerText += "----------------------\n";
      outputDiv.scrollTop = outputDiv.scrollHeight; // تمرير التمرير تلقائيًا لأسفل
    })
    .catch((error) => {
      console.error(error);
    });
}

const images = [
  'jordan-1.jpg',
  'jordan-2.jpg',
  'jordan-3.jpg',
  'jordan-4.jpg',
  'jordan-5.jpg',
  'jordan-6.jpg',
  'jordan-7.jpg',
  'jordan-8.jpg'
];
let currentImageIndex = 0;

function changeBackground() {
  document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % images.length;
}

setInterval(changeBackground, 60000);





