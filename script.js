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

function addEntry(type) {
  const entry = prompt(`Enter new ${type}:`);
  if (!entry) return;

  const listId = `${type}s-list`;
  const ul = document.getElementById(listId);
  const li = document.createElement('li');
  li.textContent = entry;
  ul.appendChild(li);

  state[`${type}s`].push(entry);
}

function addExperience() {
  if (state.experiences.length >= 10) {
    const confirmForget = confirm("You have reached the memory limit. You must forget an old experience. Continue?");
    if (!confirmForget) return;

    const index = prompt("Enter the number (1 to 10) of the experience to forget:");
    const parsedIndex = parseInt(index, 10) - 1;
    if (parsedIndex >= 0 && parsedIndex < state.experiences.length) {
      const removed = state.experiences.splice(parsedIndex, 1)[0];
      const list = document.getElementById("experiences-list");
      list.removeChild(list.childNodes[parsedIndex]);
    } else {
      alert("Invalid index.");
      return;
    }
  }

  const exp = prompt("Describe the new experience:");
  if (!exp) return;

  state.experiences.push(exp);
  const ul = document.getElementById('experiences-list');
  const li = document.createElement('li');
  li.textContent = exp;
  ul.appendChild(li);

  updateMemoryWarning();
}

function updateMemoryWarning() {
  const warning = document.getElementById('memory-warning');
  if (state.experiences.length >= 10) {
    warning.textContent = '(Memory full)';
  } else if (state.experiences.length >= 8) {
    warning.textContent = '(Memory nearing limit)';
  } else {
    warning.textContent = '';
  }
}

function rollPrompt() {
  const d10 = Math.floor(Math.random() * 10) + 1;
  const d6 = Math.floor(Math.random() * 6) + 1;
  let result = d10 - d6;
  if (result < 1) result = 1;
  if (result > 10) result = 10;

  document.getElementById('current-prompt').textContent = `#${result}`;
  document.getElementById('prompt-text').textContent = prompts[result];
}
