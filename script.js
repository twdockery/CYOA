// setting clear variables
	let state = {
	  skills: [],
	  resources: [],
	  characters: [],
	  marks: [],
	  experiences: []
	};


// Array to store form data
    let submissions = [];

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






/**********************************
   tab system on the right?
**********************************/

 document.querySelectorAll('.tab-handle').forEach(handle => {
   handle.addEventListener('click', () => {
     let targetId = handle.getAttribute('data-target');
     let targetTab = document.getElementById(targetId);
     let sidebarTabs = document.querySelectorAll('.sidebar-tab');
     let isTargetClosed = targetTab.classList.contains('closed');
     let openTab = Array.from(sidebarTabs).find(tab => !tab.classList.contains('closed'));
 
     if (isTargetClosed) {
       if (openTab && openTab !== targetTab) {
         // Instantly switch tabs, no animation at all
         sidebarTabs.forEach(tab => {
           tab.classList.add('no-transition');
           tab.classList.add('closed');
           void tab.offsetWidth;
           tab.classList.remove('no-transition');
         });
         targetTab.classList.add('no-transition');
         targetTab.classList.remove('closed');
         void targetTab.offsetWidth;
         targetTab.classList.remove('no-transition');
       } else {
         // Animate open (no other tab is open)
         targetTab.classList.remove('closed');
       }
     } else {
       // Animate close
       targetTab.classList.add('closed');
     }
   });
 });


  
/**************************************
tab system on the bottom
**************************************/
let tabCount = 8;
let tabContents = [
  ['Apple', 'Banana', 'Cherry'],
  ['Egg', 'Fig', 'Grape'],
  ['Item 1', 'Item 2', 'Item 3'],
  ['A', 'B', 'C'],
  ['One', 'Two'],
  ['Alpha', 'Beta', 'Gamma'],
  ['Red', 'Blue'],
  ['First', 'Second', 'Third']
];

let bottomTray = document.getElementById('bottom-tray');
let tabs = document.querySelectorAll('.bottom-tab');
let list = document.getElementById('sideways-list');
let openTab = null;

function renderList(idx) {
  list.innerHTML = '';
  (tabContents[idx] || []).slice(0, 4).forEach(item => {
    let li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    let idx = Number(tab.dataset.tab);
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



/************************************
This makes the tabs work and the form work
************************************/

function updateFormForPrompt(promptObj) {
  // promptObj: { header, nameLabel, descriptionLabel, nameRequired, descriptionRequired, descriptionMaxLength, ... }

  // Update form header
  document.getElementById('form-header').textContent = promptObj.header || "Submit Your Info";

  // Update name label and field
  document.getElementById('name-label').textContent = promptObj.nameLabel || "Name:";
  document.getElementById('name-input').required = promptObj.nameRequired !== false; // default true

  // Update description label and textarea
  document.getElementById('description-label').textContent = promptObj.descriptionLabel || "Description:";
  document.getElementById('description-input').required = promptObj.descriptionRequired !== false; // default true
  document.getElementById('description-input').maxLength = promptObj.descriptionMaxLength || 400;
  document.getElementById('description-input').placeholder = promptObj.descriptionPlaceholder || "";

  // Optionally clear previous values or set defaults
  document.getElementById('name-input').value = "";
  document.getElementById('description-input').value = "";
}




/******************************
These are the game functions
******************************/



/****************************************
This function replaces text in the form
example: updateLabels("Say","sayit"); will update the form
***************************************/
let label1Text = "str";
let label2Text = "str";

function updateLabels(label1Text, label2Text) {
    let label1 = document.getElementById('name-label');
    if (label1) {
        label1.textContent = label1Text;
    }

    let label2 = document.getElementById('description-label');
    if (label2) {
        label2.textContent = label2Text;
    }
}





/**********************************************
This function adds to existing arrays
**********************************************/


function updateArray(arrayName) {
    if (arrayName === "skills") {
        updateLabels("Name your new skill", "Briefly describe it");
    } else if (arrayName === "resources") {
        updateLabels("Name your new resource", "Tell us about it");
    } else if (arrayName === "characters") {
        updateLabels("Who is this new person in your life", "Tell us about them");
    } else if (arrayName === "marks") {
        updateLabels("Describe the mark", "How did you get it and how does it affect you");
    } else if (arrayName === "experiences") {
        updateLabels("Please name your memory", "Give us one sentence about it");
     else {
        updateLabels("Input Title", "Input Description");
    }
	  
    const submitButton = document.getElementById('submitButton');
    if (!submitButton.dataset.bound || submitButton.dataset.bound !== arrayName) {
        submitButton.removeEventListener('click', handleSubmit); // prevent duplicate bindings
        submitButton.addEventListener('click', handleSubmit);
        submitButton.dataset.bound = arrayName;
    }



    function handleSubmit(event) {
        event.preventDefault();

        const input1 = document.getElementById('input1');
        const input2 = document.getElementById('input2');

        if (!input1 || !input2) return;

        const entry = {
            title: input1.value.trim(),
            description: input2.value.trim()
        };

        if (entry.title === "" || entry.description === "") return;

        switch (arrayName) {
            case "skills":
                skills.push(entry);
                break;
            case "resources":
                if (!window.resources) window.resources = [];
                window.resources.push(entry);
                break;
			case "marks":
                if (!window.marks) window.marks = [];
                window.marks.push(entry);
                break;
            case "characters":
                if (!window.characters) window.characters = [];
                window.characters.push(entry);
                break;
			case "experiences":
                if (!window.experiences) window.experiences = [];
                window.experiences.push(entry);
                break;
            default:
                if (!window[arrayName]) window[arrayName] = [];
                window[arrayName].push(entry);
        }

        fullStory.push(entry);

        input1.value = "";
        input2.value = "";
    }
}
