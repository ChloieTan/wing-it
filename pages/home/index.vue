<script setup>
import { ref } from 'vue'
import { verifyUser } from '~/assets/js/verify'

const hoverGroup = ref(false)
const hoverChat = ref(false)
const hoverId = ref(false)
const hoverExplore = ref(false)
const hoverStadium = ref(false)
const showGeekCardCreation = ref(false);
const showCard = ref("")

onMounted(async () => {
  verifyUser()

  const id = sessionStorage.getItem('id');
  await nextTick();
  const { data: { value } } = await useFetch(`/api/user/${id}`, {
    method: 'get',
  });
  console.log(value);
  if (value.UserInterest.length === 0) {
    showGeekCardCreation.value = true;
  }
})

</script>

<template>
  <GeekCardCreation v-if="showGeekCardCreation === true"></GeekCardCreation>
  <ProfileCard v-if="showCard === 'id'" @close="showCard = ''" />
  <GuildCard v-if="showCard === 'group'" @close="showCard = ''" />
  <GeneralStadiumCard v-if="showCard === 'stadium'" leftTitle="Let the Games Begin!" rightTitle="Join a Competition!"
    @close="showCard = ''" />
  <div class="w-full h-full bg-linear-[45deg,#8297F6,#89E1FA] flex justify-center items-center">
    <div
      class="font-mono tracking-[-0.1em] text-[#004D9A] text-[calc(100vw/5.3)]/[0.8em] ml-[-0.1em] whitespace-nowrap overflow-hidden absolute top-0">
      &ltGEEK WORLD&gt</div>
    <div class="relative">
      <img class="relative h-[80%] w-auto object-cover floating" src="/assets/img/world_map.png" />
      <button @mouseover="hoverGroup = true" @mouseleave="hoverGroup = false" @click="showCard = 'group'"
        class="hover:cursor-pointer absolute top-[17%] right-[33%] w-[25px] h-[25px] rounded-[50%] bg-[#D9D9D9] border-3 border-black">
        <span v-if="hoverGroup"
          class="top-[30px] left-0 font-mono bg-[#D9D9D9] absolute whitespace-nowrap px-[20px] py-[10px] border-3 border-black rounded-md">
          Groups</span>
      </button>
      <button @mouseover="hoverChat = true" @mouseleave="hoverChat = false"
        class="hover:cursor-pointer absolute top-[35%] left-[10%] w-[25px] h-[25px] rounded-[50%] bg-[#D9D9D9] border-3 border-black">
        <span v-if="hoverChat"
          class="top-[30px] left-0 font-mono bg-[#D9D9D9] absolute whitespace-nowrap px-[20px] py-[10px] border-3 border-black rounded-md">
          Chats</span></button>
      <button @mouseover="hoverId = true" @mouseleave="hoverId = false" @click="showCard = 'id'"
        class="hover:cursor-pointer absolute top-[56%] left-[19%] w-[25px] h-[25px] rounded-[50%] bg-[#D9D9D9] border-3 border-black">
        <span v-if="hoverId"
          class="top-[30px] left-0 font-mono bg-[#D9D9D9] absolute whitespace-nowrap px-[20px] py-[10px] border-3 border-black rounded-md">
          My ID</span></button>
      <button @mouseover="hoverExplore = true" @mouseleave="hoverExplore = false"
        class="hover:cursor-pointer absolute bottom-[12%] left-[25%] w-[25px] h-[25px] rounded-[50%] bg-[#D9D9D9] border-3 border-black">
        <span v-if="hoverExplore"
          class="top-[30px] left-0 font-mono bg-[#D9D9D9] absolute whitespace-nowrap px-[20px] py-[10px] border-3 border-black rounded-md">
          Explore</span></button>
      <button @mouseover="hoverStadium = true" @mouseleave="hoverStadium = false" @click="showCard = 'stadium'"
        class="hover:cursor-pointer absolute bottom-[20%] left-[45%] w-[25px] h-[25px] rounded-[50%] bg-[#D9D9D9] border-3 border-black">
        <span v-if="hoverStadium"
          class="top-[30px] left-0 font-mono bg-[#D9D9D9] absolute whitespace-nowrap px-[20px] py-[10px] border-3 border-black rounded-md">Stadium</span></button>
    </div>
  </div>

  <div class="fixed bottom-0 left-0 z-50 w-full h-[75px] bg-[#D9D9D9] border-t">
    <div class="grid h-full w-fit grid-cols-6 mx-auto font-medium">
      <button type="button" @click="showCard = 'group'"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group">
        <img class="h-[50px]" src="/assets/img/ic_group.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Groups</span>
      </button>
      <button type="button" @click="showCard = 'stadium'"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group">
        <img class="h-[50px]" src="/assets/img/ic_stadium.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Stadium</span>
      </button>
      <button type="button"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group">
        <img class="h-[50px]" src="/assets/img/ic_chat.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Chats</span>
      </button>
      <button type="button"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group"
        @click="showCard = 'id'">
        <img class="h-[50px]" src="/assets/img/ic_id.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Me</span>
      </button>
      <button type="button"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group">
        <img class="h-[50px]" src="/assets/img/ic_friends.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Friends</span>
      </button>
      <button type="button"
        class="hover:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-[#B5B5B5] group">
        <img class="h-[50px]" src="/assets/img/ic_explore.png" />
        <span
          class=" font-mono text-lg/tight text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Explore</span>
      </button>
    </div>
  </div>
</template>
