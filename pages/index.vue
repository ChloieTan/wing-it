<script setup lang="ts">
const { data } = await useFetch('/api/hello');

const createDiv = () => {
  const parentOutput = document.querySelector('.outputs');
  const div = document.createElement('div')
  div.className = 'history';
  if(parentOutput){parentOutput.appendChild(div);}
  return div;
}

const handleCommand = (event) => {
  if (event.key  === "Enter"){
  switch(event.target.value){
    case 'help':
      const helpDiv = createDiv();
      helpDiv.innerHTML = `
        <p style = "font-family: Cascadia Code, monospace;">Available commands:</p>
        <ul>
          <li style = "font-family: Cascadia Code, monospace;">help - show list of available commands</li>
          <li style = "font-family: Cascadia Code, monospace;">about - show information about GeeksConnect</li>
          <li style = "font-family: Cascadia Code, monospace;">contact - show contact information</li>
          <li style = "font-family: Cascadia Code, monospace;">login - login to GeeksConnect</li>
          <li style = "font-family: Cascadia Code, monospace;">register - register to GeeksConnect</li>
          <li style = "font-family: Cascadia Code, monospace;">clear – clear history </li>
        </ul>
      `;
      createTerminalInput();
      break;
    case 'about':
      const aboutDiv = createDiv();
        aboutDiv.innerHTML = `
          Some about information
        `;
        createTerminalInput();
      break;
    case 'contact':
      const contactDiv = createDiv();
        contactDiv.innerHTML = `
          <p style = "font-family: Cascadia Code, monospace;">Available commands:</p>
          <ul>
            <li style = "font-family: Cascadia Code, monospace;">help - show list of available commands</li>
            <li style = "font-family: Cascadia Code, monospace;">about - show information about GeeksConnect</li>
            <li style = "font-family: Cascadia Code, monospace;">contact - show contact information</li>
            <li style = "font-family: Cascadia Code, monospace;">login - login to GeeksConnect</li>
            <li style = "font-family: Cascadia Code, monospace;">register - register to GeeksConnect</li>
            <li style = "font-family: Cascadia Code, monospace;">clear – clear history </li>
          </ul>
        `;
        createTerminalInput();
      break;
    case 'login':
      const loginDiv = createDiv();
        loginDiv.innerHTML = `
          Enter your username:
        `;
        createLoginInput();
        // createTerminalInput();
      break;  
    case 'register':
      const registerDiv = createDiv();
        registerDiv.innerHTML = `
          <p style = "font-family: Cascadia Code, monospace;">Available commands:</p>
          <ul>
            <li style = "font-family: Cascadia Code, monospace;">help - show list of available commands</li>
            <li style = "font-family: Cascadia Code, monospace;">about - show information about GeeksConnect</li>
            <li style = "font-family: Cascadia Code, monospace;">contact - show contact information</li>
            <li style = "font-family: Cascadia Code, monospace;">login --username <username> --password <password> - login to GeeksConnect</li>
            <li style = "font-family: Cascadia Code, monospace;">register - register to GeeksConnect</li>
            <li style = "font-family: Cascadia Code, monospace;">clear – clear history </li>
          </ul>
        `;
        createTerminalInput();
      break;  
    case 'clear':
      clearHistory();
      createTerminalInput();
      break;    
    default:
      console.log('Invalid command');}
  }
}
const handleLogin = (event) => {
  if (event.key === "Enter") {
    const username = event.target.value; 
    checkUsernameInDatabase(username)
      .then((usernameExists) => {
        if (usernameExists) {
          promptForPassword();
        } else {
          const doNotExistDiv = createDiv();
          doNotExistDiv.innerHTML = "User does not exist! (Type clear to escape)";
        }
      })
      .catch((error) => {
        console.error("Error checking username:", error);
      });
  }
};

const checkUsernameInDatabase = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockDatabase = ["user1", "user2", "admin"]; 
      if (mockDatabase.includes(username)) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000); 
  });
};



const createLoginInput = () =>{
  const parentOutput = document.querySelector('.outputs');
  const div = document.createElement('div');
  div.className = 'history';

  div.addEventListener("keydown",(event)=>{
    handleLogin(event);
  })
  div.innerHTML=`
        <label style = "font-family: Cascadia Code, monospace">Enter your username:</label><input type="text" class="mx-2 outline outline-transparent" autofocus style = "font-family: Cascadia Code, monospace"/>
      `
  if(parentOutput){
    parentOutput.appendChild(div);
    div.getElementsByTagName('input')[0].focus(); 
  }
  return div;
}
const clearHistory  = () =>{
  const historyDivs = document.querySelectorAll('.history');
  historyDivs.forEach((div)=>{
    div.remove();
  })
}
const createTerminalInput = () => {
  const parentOutput = document.querySelector('.outputs');
  const div = document.createElement('div');
  div.className = 'history';

  div.addEventListener("keydown",(event)=>{
    handleCommand(event);
  })
  div.innerHTML=`
        <label style = "font-family: Cascadia Code, monospace">guest@geeks-connect:~$</label><input type="text" class="mx-2 outline outline-transparent" autofocus style = "font-family: Cascadia Code, monospace"/>
      `
  if(parentOutput){
    parentOutput.appendChild(div);
    div.getElementsByTagName('input')[0].focus(); 
  }
  return div;
}
</script>

<template>
  <section class="h-screen w-screen rounded-lg p-3 overflow-hidden">
    <div class="w-full h-full outline-1 rounded-lg p-2 overflow-auto outputs">
      <label>guest@geeks-connect:~$</label><input type="text" disabled class="mx-2"/>
      <h1  class="text-6xl pixelify-sans-400">GEEKS CONNECT</h1>
      <p>Welcome to GeeksConnect, a social community space for tech geeks, 
        <br>
        brought to you by GeeksHacking
        <br>
        ---
        <br>
        Type 'help' to see list of available commands.
      </p>
      <label>guest@geeks-connect:~$</label><input @keydown="handleCommand" type="text" class="mx-2 outline outline-transparent" autofocus style = "font-family: Cascadia Code, monospace"/>


    </div>
  </section>
  <!-- <pre>{{ data }}</pre>
  <h1 class="text-3xl font-bold underline">Hello world!</h1> -->
</template>
