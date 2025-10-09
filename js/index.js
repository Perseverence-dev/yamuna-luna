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
  'Flexbox',
  'Grid',
  'Responsive Design',
  'Salesforce Flow',
  'Apex',
  'SOQL',
  'LWC'
];

// Select only inside the Skills section
const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector('ul.skills-list');

// Create <li> items and append
skills.forEach(text => {
  const li = document.createElement('li');  
  li.textContent = text;                    
  skillsList.appendChild(li);               
});


console.log('Footer injected:', footer.outerHTML);
console.log('Skills rendered:', skills.length);
