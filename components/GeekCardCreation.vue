<script setup lang="js">

var showInterests = ref(false);
var expandButton = ref('+');
const previousSelection = ref(null); 
var interestsToAdd = ref([]);
var search_interest = ref("");
var filteredInterests = ref([]);
const showCreateGeekId = ref(false);

const props = defineProps({
  guildId: {
    type: Number,
  }
})
const guilds = ref(null);

const {
  data: { value },
} = await useFetch('/api/guild/', { method: 'get' });
guilds.value = value;
console.log(guilds)

const getInterestList = async()=>{
    try {
    const { data: { value } } = await useFetch('/api/interest/', {
      method: 'get'
    }
    )
    const interestList = value.map((ele)=>{
        return ele.name;
    })
    return interestList;
    }catch(error){
        console.error("Error getting list of interests:", error);
    }
    }


const interestList = await getInterestList();


const handleSelectGender = (event) => {
    if (previousSelection.value) {
        previousSelection.value.classList.remove('font-bold');
    }
    const selectedGender = event.target;
    selectedGender.classList.add('font-bold');
    previousSelection.value = selectedGender;
}


const handleShowAddInterests = () => {
  showInterests.value = !showInterests.value;
  if(showInterests.value){
    expandButton.value = '-';
  }
  else{
    expandButton.value = '+';
  }
};


watch(search_interest, (newValue, oldValue) => {
    console.log(interestList);
    if(interestList){
        filteredInterests = interestList.filter(interest =>
        interest.toLowerCase().includes(search_interest.value.toLowerCase())
        );
    }
});
  // You can run additional logic here if needed

const  addInterest = (interest) =>{
    interestsToAdd.value.push(interest);
}
const removeInterest = (interest) => {
  interestsToAdd.value = interestsToAdd.value.filter(item => item !== interest);
}

const handleGeekInfo = async() =>{
    const final_gender = previousSelection.value.innerHTML;
    const name = document.getElementById("input-name").value;
    const age = document.getElementById("input-age").value;
    if(!name || !age || !final_gender){
        
        return;
    }
    try {
    console.log(sessionStorage.getItem('id'));

    const { data: { value } } = await useFetch('/api/user/', {
      method: 'put',
      body: {
        id: Number(sessionStorage.getItem('id')),
        gender: final_gender,
        name: name,
        age: Number(age),
        user_interest: interestsToAdd.value
      }
    }
    );   
    if(value){
        showCreateGeekId.value= false;
    } 
    }catch(error){
        console.error("Error updating geek information:", error);
    }
}

</script>
<template>
    <Card title="Create Geek ID" v-if="showCreateGeekId===true">
        <div class="flex row w-full">
            <div class=" w-1/2">
                <img src="../assets/img/geek_world_logo.png">
            </div>
            <div class=" w-1/2 ml-3 p-3 ">
                <ul>
                    <li class="border-b-1 border-solid p-2"><input id="input-name" class="outline outline-transparent" placeholder="Name"></li> 
                    <li class="border-b-1 border-solid p-2"><input id="input-age" class="outline outline-transparent" placeholder="Age"></li>
                    <li class="border-b-1 border-solid p-2">
                        <div>
                            <button v-on:click="handleSelectGender">Female</button>
                            <span>&nbsp;/&nbsp;</span>
                            <button v-on:click="handleSelectGender">Male</button>
                            <span>&nbsp;/&nbsp;</span>
                            <button v-on:click="handleSelectGender">Prefer not to say</button>
                        </div>
                    </li>
                    <li class="p-2">
                        <div>Interests
                            <button v-on:click="handleShowAddInterests">{{expandButton}}</button>
                        </div>
                        <div v-if="showInterests" class="flex flex-col justify-start">
                            <div class="bg-[#D9D9D9] border rounded-lg w-full mt-2">
                                <input v-model="search_interest" class="ml-2 mr-1 outline outline-transparent interests-input" placeholder="Search for your interests">
                            </div>
                            <div v-if="filteredInterests.length > 0"> 
                                <div v-for="(interest, index) in filteredInterests.splice(0,10)" :key="index" class="text-xs m-2 bg-sky-400 text-black px-3 py-1 rounded-full font-mono inline-block">
                                    <span>{{ interest }}</span>
                                    <button @click="addInterest(interest)" class="mx-2">+</button>
                                </div>
                                </div>
                                <div v-else>
                                <p>No matching interests found.</p>
                            </div>

                            <div v-if="interestsToAdd.length > 0"> 
                                <div v-for="(interest, index) in interestsToAdd" :key="index" class="text-xs text-white m-2 bg-sky-800 text-black px-3 py-1 rounded-full font-mono inline-block">
                                    <span>{{ interest }}</span>
                                    <button @click="removeInterest(interest)" class="mx-2">-</button>
                                </div>
                                </div>
                            <!-- <div class="input-interests mt-3"></div> -->

                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-full relative">
            <button class="absolute bg-green-400 bottom-0 right-0 px-4 py-1  top-5 font-mono justify-center " v-on:click="handleGeekInfo">Next</button>
        </div>


    </Card>
    <Card title="Your Suggested Guilds" v-else>
  <div class="bg-linear-[#78B6F5,#ECECEC] rounded-2xl mt-15 h-100 p-2 border-3">
    <h2 class="text-2xl font-mono p-5 mt-3">
      We found some suitable guilds for you based on your interests!
    </h2>
    <!-- Flex container for horizontal layout -->
    <div class="flex flex-wrap gap-4 justify-center">
      <div
        v-for="guild in guilds.slice(0,2)"
        :key="guild.id"
        :title="guild.title"
        class="bg-linear-[45deg,#F8F8F8,#D0F9DC] w-80 rounded-4xl p-8 border-2 font-mono border-black relative"
      >
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-gray-300"></div>
          <h2 class="text-xl">{{ guild.title }}</h2>
        </div>
        <div class="mt-1">
          <span class="text-sm text-gray-600">{{ guild.tags }}</span>
        </div>
        <p class="mt-2 text-sm">{{ guild.description }}</p>
        <p class="mt-2 text-sm text-gray-500">By: {{ guild.author }}</p>
        <!-- Plus sign at the bottom center of the card -->
        <div class="absolute bottom-0 transform right-3 translate-x-1 text-9xl">
          +
        </div>
      </div>
    </div>
    <button class="justify-center absolute bottom-35 right-9 flex bg-linear-[#E94FC5,#FFB7EE] w-40 h-10 rounded-2xl border-2 font-mono items-center">Done</button>
  </div>
</Card>


</template>