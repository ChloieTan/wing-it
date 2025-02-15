<script setup>
import { ref } from 'vue';
import Card from '~/components/Card.vue';

const colors = ["bg-linear-[90deg,#FFB7EE,#FFFFFF]", "bg-linear-[90deg,#4FE97B,#FFFFFF]", "bg-linear-[90deg,#776AD8,#FFFFFF]"]
const actions = [{ name: 'Create New', backgroundColor: 'bg-[#D8ECFF]' }];

const userId = sessionStorage.getItem('id');
const guilds = ref(null);
const showGuild = ref(0)

const {
  data: { value },
} = await useFetch(`/api/guild/user/${userId}`, { method: 'get' });
guilds.value = value;
showGuild.value = value[0].guildId

const emit = defineEmits(['close']);
</script>

<template>
  <Card v-if="guilds" title="My Guilds" :headerActions="actions" @close="emit('close')">
    <div class="flex gap-2 p-3">
      <button v-for="(guild, index) in guilds" class="hover:cursor-pointer font-mono p-3 rounded-full border-3"
        :class="`${colors[index % colors.length]}`" @click="showGuild = guild.guildId">{{
          guild.Guild.title }}</button>
    </div>
    <div v-for="guild in guilds" v-show="showGuild === guild.guildId"
      class="bg-linear-[90deg,#FFB7EE,#FFFFFF] rounded-t-lg border-3 mx-3 overflow-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
        <!-- Upcoming Events Section -->
        <div>
          <div class="bg-blue-500 text-center p-3 font-mono text-xl rounded-t-lg border-3">
            UPCOMING EVENTS
          </div>

          <!-- Event Cards -->
          <div class="space-y-4 p-4 bg-linear-[180deg,#78B6F5,#ECECEC] rounded-b-lg border-3 border-t-0 overflow-auto">
            <div v-for="event in guild.Guild.GuildEvent" :key="event.id" class="bg-blue-500 rounded-lg border-3">
              <div class="relative">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4IIIB6V5LQ8Byswb4S7j1-3BNzGceB5XguA&s"
                  :alt="event.title" class="w-full h-48 object-cover rounded" />
                <div class="absolute top-2 right-2 bg-blue-200 px-3 py-1 rounded-lg font-mono border-3">
                  {{ event.title }}
                </div>
                <button
                  class="absolute bottom-2 right-2 bg-[#FFB235] hover:cursor-pointer hover:bg-orange-500 transition-colors px-4 py-1 font-mono border-3 rounded-lg">
                  REGISTER
                </button>
              </div>
              <div class="bg-blue-500 text-black p-2 font-mono rounded-b-md border-t-3">
                {{ new Date(event.date).toLocaleString("en-GB", {
                  dateStyle: "full",
                  timeStyle: "medium"
                }) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Guild Leaders Section -->
        <div>
          <div class="bg-blue-500 p-3 font-mono text-xl rounded-t-lg border-3">
            GUILD LEADERS
          </div>
          <div class="bg-[#F2F2F2] rounded-b-lg border-3 border-t-0">
            <div v-for="member in guild.Guild.GuildMembers" :key="member.User.username"
              class=" border-b-3 border-gray-200 last:border-b-0">
              <div v-if="member.leader" class="p-4 font-mono text-lg">
                {{ member.User.username }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
