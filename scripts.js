// Array to store form data
    const submissions = [];

    // Reference to form and inputs
    let form = document.getElementById('info-form');
    let nameInput = document.getElementById('name-input');
    let descriptionInput = document.getElementById('description-input');
    let outputList = document.getElementById('output-list');

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      let nameValue = nameInput.value.trim();
      let descriptionValue = descriptionInput.value.trim();

      // Push object with name and description to array
      submissions.push({
        name: nameValue,
        description: descriptionValue
      });

      // Update the output list for visual feedback
      let newItem = document.createElement('li');
      newItem.textContent = `Name: ${nameValue} | Description: ${descriptionValue}`;
      outputList.appendChild(newItem);

      // Clear the form fields
      nameInput.value = '';
      descriptionInput.value = '';
    });




/*******************************
These are the game prompts
*******************************/
const prompts = {
  1: "You awake in darkness. Describe the first memory you have after becoming a vampire.",
  2: "You gain a strange new skill. What is it? How did you discover it?",
  3: "You meet a mortal who reminds you of someone long dead. What do they stir in you?",
  4: "A vampire hunter stalks you. How do you respond? What do you sacrifice?",
  5: "You discover a hidden journal with cryptic notes written in your own hand.",
  6: "One of your marks changes. Why? What triggered this transformation?",
  7: "You forget an important memory. What is gone? Replace an experience.",
  8: "You are forced to abandon a resource. Why? What is lost?",
  9: "A rival vampire confronts you. What is the conflict? Who wins?",
  10: "You remember a long-lost experience. Replace a forgotten one with a vivid new detail.",
  // Add more as needed
};

let state = {
  skills: [],
  resources: [],
  characters: [],
  marks: [],
  experiences: []
};




/**********************************
   tab system on the right?
**********************************/

document.querySelectorAll('.tab-handle').forEach(handle => {
    handle.addEventListener('click', () => {
      let targetId = handle.getAttribute('data-target');
      let tab = document.getElementById(targetId);
      tab.classList.toggle('closed');
    });
  });

  document.getElementById('openAllTabs').addEventListener('click', () => {
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
      tab.classList.remove('closed');
    });
  });


  
/**************************************
tab system on the bottom
**************************************/
const tabCount = 8;
const tabContents = [
  ['Apple', 'Banana', 'Cherry'],
  ['Egg', 'Fig', 'Grape'],
  ['Item 1', 'Item 2', 'Item 3'],
  ['A', 'B', 'C'],
  ['One', 'Two'],
  ['Alpha', 'Beta', 'Gamma'],
  ['Red', 'Blue'],
  ['First', 'Second', 'Third']
];

const bottomTray = document.getElementById('bottom-tray');
const tabs = document.querySelectorAll('.bottom-tab');
const list = document.getElementById('sideways-list');
let openTab = null;

function renderList(idx) {
  list.innerHTML = '';
  (tabContents[idx] || []).slice(0, 4).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const idx = Number(tab.dataset.tab);
    if (openTab === idx) {
      // Hide tray
      bottomTray.classList.remove('tray-open');
      tabs.forEach(t => t.classList.remove('active'));
      openTab = null;
    } else {
      // Switch tray
      renderList(idx);
      bottomTray.classList.add('tray-open');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      openTab = idx;
    }
  });
});

// Optional: Hide tray if user clicks outside
document.addEventListener('click', e => {
  if (!bottomTray.contains(e.target)) {
    bottomTray.classList.remove('tray-open');
    tabs.forEach(t => t.classList.remove('active'));
    openTab = null;
  }
});
