<script setup lang="ts">


const createDiv = () => {
  const parentOutput = document.querySelector('.outputs');
  const div = document.createElement('div')
  div.className = 'history';
  if (parentOutput) { parentOutput.appendChild(div); }
  return div;
}

const handleCommand = (event) => {
  if (event.key === "Enter") {
    switch (event.target.value) {
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
        createLoginInput();
        break;
      case 'register':
        createRegisterInput();
        break;
      case 'clear':
        clearHistory();
        createTerminalInput();
        break;
      default:
        const invalidDiv = createDiv();
        invalidDiv.innerHTML = "Invalid command. Type 'help' to see list of available commands. "
        createTerminalInput();
    }
  }
}

const createRegisterInput = () => {
  const parentOutput = document.querySelector('.outputs');
  const div = document.createElement('div');
  div.className = 'history';
  let username = "";
  let password = "";

  // Create the username input field
  div.innerHTML = `
    <label style="font-family: Cascadia Code, monospace">Enter a username:</label>
    <input type="text" class="mx-2 outline outline-transparent" autofocus style="font-family: Cascadia Code, monospace"/>
  `;

  div.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      username = div.querySelector('input').value;
      if (username) {
        createPasswordInput();
      }
    }
  });

  if (parentOutput) {
    parentOutput.appendChild(div);
    div.getElementsByTagName('input')[0].focus();  // Focus on the username input
  }

  const createPasswordInput = () => {
    const passwordDiv = document.createElement('div');
    passwordDiv.className = 'history';

    // Create password input field
    passwordDiv.innerHTML = `
      <label style="font-family: Cascadia Code, monospace">Enter a password:</label>
      <input type="password" class="mx-2 outline outline-transparent" autofocus style="font-family: Cascadia Code, monospace"/>
    `;

    if (parentOutput) {
      parentOutput.appendChild(passwordDiv);
      passwordDiv.getElementsByTagName('input')[0].focus();
    }

    passwordDiv.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        password = passwordDiv.querySelector('input').value;
        if (password) {
          createAccount(username, password);
        }
      }
    });
  };

  return div;
};


const createAccount = async (input_username, input_password) => {
  try {
    const { data: { value } } = await useFetch('/api/user', {
      method: 'post',
      body: {
        username: input_username,
        password: input_password
      }
    }
    )

    if (value) {
      createTerminalInput();
    }
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

const handleLogin = async (input_username, input_password) => {
  const parentOutput = document.querySelector('.outputs');
  try {
    const { data: { value } } = await useFetch('/api/user/verify', {
      method: 'post',
      body: {
        username: input_username,
        password: input_password
      }
    });

    console.log(value.id);

    if (value) {
      sessionStorage.setItem("id",value.id);
      const router = useRouter();
      router.push({ path: "/home" });
    } else {
      const doNotExistDiv = createDiv();
      doNotExistDiv.innerHTML = "Username/Password is incorrect!";
      parentOutput?.appendChild(doNotExistDiv);
      createTerminalInput();

    }
  } catch (error) {
    console.error("Error handling login:", error);
  }
};


const createLoginInput = () => {
  const parentOutput = document.querySelector('.outputs');
  const div = document.createElement('div');
  div.className = 'history';
  let username = "";
  let password = "";

  // Create the username input field
  div.innerHTML = `
    <label style="font-family: Cascadia Code, monospace">Enter your username:</label>
    <input type="text" class="mx-2 outline outline-transparent" autofocus style="font-family: Cascadia Code, monospace"/>
  `;

  div.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      username = div.querySelector('input').value;
      if (username) {
        createPasswordInput();
      } else {
        alert("Please enter a username.");
      }
    }
  });

  if (parentOutput) {
    parentOutput.appendChild(div);
    div.getElementsByTagName('input')[0].focus();  // Focus on the username input
  }

  const createPasswordInput = () => {
    const passwordDiv = document.createElement('div');
    passwordDiv.className = 'history';

    // Create password input field
    passwordDiv.innerHTML = `
      <label style="font-family: Cascadia Code, monospace">Enter your password:</label>
      <input type="password" class="mx-2 outline outline-transparent" autofocus style="font-family: Cascadia Code, monospace"/>
    `;

    if (parentOutput) {
      parentOutput.appendChild(passwordDiv);
      passwordDiv.getElementsByTagName('input')[0].focus();
    }

    passwordDiv.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        password = passwordDiv.querySelector('input').value;
        if (password) {
          handleLogin(username, password);
        }
      }
    });
  };

  return div;
};


const clearHistory = () => {
  const historyDivs = document.querySelectorAll('.history');
  historyDivs.forEach((div) => {
    div.remove();
  })
}
const createTerminalInput = () => {
  const parentOutput = document.querySelector('.outputs');
  const div = document.createElement('div');
  div.className = 'history';

  div.addEventListener("keydown", (event) => {
    handleCommand(event);
  })
  div.innerHTML = `
        <label>guest@geeks-connect:~$</label><input type="text" class="mx-2 outline outline-transparent" autofocus/>
      `
  if (parentOutput) {
    parentOutput.appendChild(div);
    div.getElementsByTagName('input')[0].focus();
  }
  return div;
}
</script>

<template>

  <section class=" bg-gradient-to-b from-slate-50 to-sky-300 h-screen w-screen rounded-lg p-3 overflow-hidden">
    <div class="relative w-full h-full outline-1 rounded-lg p-2 overflow-auto outputs z-2">
      <label>guest@geeks-connect:~$</label><input type="text" disabled class="mx-2" />
      <h1 class="text-6xl pixelify-sans-400">GEEK WORLD</h1>
      <p>Welcome to Geek World, a social community space for tech geeks,
        <br>
        brought to you by GeeksHacking
        <br>
        ---
        <br>
        Type 'help' to see list of available commands.
      </p>
      <label>guest@geeks-connect:~$</label><input @keydown="handleCommand" type="text"
        class="mx-2 outline outline-transparent" autofocus />
    </div>
    <div class="absolute bottom-0 right-0 z-1 opacity-70 w-full md:w-2/3">
      <img src="../assets/img/geek_world_logo.png">
    </div>
  </section>

</template>

<style lang="css" scoped>
h1 {
  font-family: Pixelify Sans;
}

section {
  font-family: Cascadia Code, monospace;
}
</style>
