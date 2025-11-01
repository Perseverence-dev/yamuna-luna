// 1) Footer creation via DOM
const footer = document.createElement('footer');
footer.className = 'site-footer';

const today = new Date();
const thisYear = today.getFullYear();

// Unicode ©; do NOT hard-code the year
const copyright = document.createElement('p');
copyright.textContent = `\u00A9 ${thisYear} Yamuna`;

footer.appendChild(copyright);
document.body.appendChild(footer);


// 2) Skills list
const skills = [
  'JavaScript',
  'HTML',
  'CSS',
  'GitHub',
  'VS Code',
  'Salesforce Flow',
  'Apex',
  'SOQL',
  'LWC',
  'Aura',
  'VF Pages',
  'SQL',
  'Advanced Excel'
];

// Select only inside the Skills section
const skillsSection = document.querySelector('#Skills');
const skillsList = skillsSection.querySelector('ul.skills-list');

// Create <li> items and append
skills.forEach(text => {
  const li = document.createElement('li');  
  li.textContent = text;                    
  skillsList.appendChild(li);               
});


console.log('Footer injected:', footer.outerHTML);
console.log('Skills rendered:', skills.length);

//Select the "leave_message" form by name attribute
const messageForm = document.querySelector('form[name="leave_message"]');

//CALLBACK FUNCTION STARTS
//Add an event listener to the messageForm element that handles the "submit" event
messageForm.addEventListener("submit",(event) => {

  //Prevent browser refreshing automatically when submitting the form
  event.preventDefault();

  //Create three new variables (one for each of the three form fields) and retrieve the value from the event
  const name = event.target.usersName.value.trim();
  const email = event.target.usersEmail.value.trim();
  const message = event.target.usersMessage.value.trim();

  //Throw error if values are null
  if(!name||!email||!message){
    alert("Please fill in the values");
    return
  }

  //Add a console.log statement to log the three variables
  console.log(`Name: ${name} ; Email: ${email} ; Message: ${message}`);

  //Select the #messages section by id
  const messageSection = document.querySelector("#messages");

  //Query the messageSection (instead of the entire document) to find the <ul> element
  const messageList = messageSection.querySelector(".message-list");

  //Make a new list item (li) element
  const newMessage = document.createElement("li");

  //<a> element that displays the "usersName" and is a clickable link to the "usersEmail" 
  //<span> element that displays the "usersMessage"
  newMessage.innerHTML = `<a href="mailto:${email}" title="Email ${name}">${name}</a>` + `
  <span>${message}</span>`;
  
  //Text message holder - written messages are saved in span element
  const msgSpan = document.createElement('span');
  msgSpan.textContent = `${message}`;

  //Clickable mailto link
  const namelink = document.createElement('a');
  namelink.href = `mailto: ${email}`;
  namelink.title = `Email : ${name}`;
  namelink.textContent = name;



  //Make a new <button> element for remove
  const removeButton = document.createElement("button");
  //Set the inner text to "remove"
  removeButton.textContent = "remove"; 
  //Set the type attribute to "button"
  removeButton.type = "button";

  //Add an event listener to the removeButton element that handles the "click" event
  //Inside the callback function, create a variable named entry that finds the button's parent element using DOM Traversal (hint: parentNode property)
  //Remove the entry element from the DOM (hint: remove method)
  removeButton.addEventListener("click",(e)=>{
    const entry = e.currentTarget.parentNode;
    entry.remove(); 
    
    // Hide the section again if there are no messages left (stretch goal #1)
    if (!messageList.children.length) {
         messageSection.hidden = true;
    }
  })


  //Edit Button
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.textContent = "Edit";

  editButton.addEventListener("click",()=>{

    const isEditing = editButton.textContent === "Save";

    //If Editing, Save changes
    if(isEditing){
      const textarea = newMessage.querySelector("textarea");
      msgSpan.textContent = `${textarea.value.trim()}`;
      textarea.replaceWith(msgSpan);
      editButton.textContent = "Edit";
      removeButton.disabled = false;
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = msgSpan.textContent;
      textarea.name = "editMessage";
      textarea.rows = 3;
      textarea.value = msgSpan.textContent.trim();
      msgSpan.replaceWith(textarea);
      textarea.focus();
      editButton.textContent = "Save";
      removeButton.disabled = true;
    }


  })

  newMessage.appendChild(namelink);
  newMessage.appendChild(msgSpan);

  //Append the removeButton to the newMessage element
  newMessage.appendChild(removeButton);
  //Add Edit Button(Stretch goal#2)
  newMessage.appendChild(editButton);
  // Reveal the Messages section if it was hidden
  messageSection.hidden = false;
  // Append the new message to the list
  messageList.appendChild(newMessage);
  
  //Reset the form
  messageForm.reset();
  
})

//Week 13: Fetch repository from github

const projectSection = document.querySelector('#Projects');
const projectList = projectSection.querySelector('#project-list');

//GET request using fetch
fetch('https://api.github.com/users/Perseverence-dev/repos')
.then(response => {
  if(!response.ok) {
    throw new Error(`Error : ${response.status}`);
  }
  return response.json();
})
.then(repositories => {
  console.log(`My Github Repositories:`,repositories);

  repositories.forEach((repo)=>{

    const project = document.createElement('li');

    const link = document.createElement('a');
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = repo.name;

    project.appendChild(link);
    projectList.appendChild(project);
    console.log('Repositories: ${repo.name}')

  });

})
.catch(error =>  console.error('Oops there was an error : ',error));

