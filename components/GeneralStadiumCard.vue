  <script setup>
  import { ref, computed } from 'vue'

  const colors = ["bg-linear-[90deg,#FFB7EE,#FFFFFF]", "bg-linear-[90deg,#4FE97B,#FFFFFF]", "bg-linear-[90deg,#776AD8,#FFFFFF]"]
  const searchQuery = ref('')
  const competitions = ref([])
  const competition = ref(null)

  const filteredCompetitions = computed(() => {
    const query = searchQuery.value.toLowerCase()
    if (!query) return competitions.value

    return competitions.value.filter(comp =>
      comp.title.toLowerCase().includes(query) ||
      comp.description.toLowerCase().includes(query) ||
      comp.skills.includes(query)
    )
  })

  const {
    data: { value },
  } = await useFetch(`/api/competition`, { method: 'get' });
  competitions.value = value;

  const handleSelect = async (id) => {
    const { data: { value } } = await useFetch(`/api/competition/${id}`, { method: 'get' })
    competition.value = value
  }


  const emit = defineEmits(['organise']);
</script>

  <template>
    <StadiumCard leftTitle="Let the Games Begin!" rightTitle="Join a Competition!">
      <div v-if="!competition">
        <div class="flex gap-x-4 mb-6">
          <div class="relative  bg-[#F0F0F0] flex-grow">
            <input type="text" v-model="searchQuery" placeholder="Search for your ideal competition"
              class="w-full p-4 pr-12 rounded-lg border-3 border-black font-mono text-xl" />
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button class="hover:cursor-pointer border-3 bg-[#71b8ff] px-4 py-1 font-mono"
            @click="emit('organise')">MANAGE</button>
        </div>
        <div class="space-y-4">
          <div v-for="competition in filteredCompetitions" :key="competition.id" @click="handleSelect(competition.id)"
            class="bg-[#F0F0F0] rounded-lg border-3 border-black p-6 cursor-pointer hover:bg-gray-50 transition-colors">
            <div class="space-y-4 flex-1 overflow-hidden">
              <div class="font-mono text-3xl mb-0">{{ competition.title }}</div>
              <div class="text-gray-600 italic">
                posted by {{ competition.User.username }}
              </div>
              <p class="font-mono line-clamp-2 overflow-ellipsis">{{ competition.description }}</p>

              <!-- Skills -->
              <div class="flex items-center gap-2">
                <span class="font-mono whitespace-nowrap">Skills Needed:</span>
                <div class="flex gap-2 flex-grow flex-wrap">
                  <span v-for="(skill, index) in competition.skills.split(', ')" :key="skill.name" :class="[
                    'px-4 py-1 rounded-full font-mono text-black border-3', colors[index % colors.length]]">
                    {{ skill }}
                  </span>
                </div>
                <div class="text-8xl/[0.5em]">→</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="font-mono">
        <div class="border-3 rounded-lg w-full p-6 bg-[#F0F0F0] mb-4 flex justify-between align-middle">
          <button class="text-3xl pb-1 mr-4 hover:cursor-pointer" @click="competition = null">↩</button>
          <div class="text-3xl flex-1">{{ competition.title }}</div>
          <button class="hover:cursor-pointer border-3 bg-[#71b8ff] px-4 py-1 font-mono">CONTACT</button>
        </div>
        <div class="flex gap-x-4">
          <div class="flex-3 flex flex-col gap-y-4">
            <div class="border-3 rounded-lg w-full p-6 bg-[#F0F0F0]">
              <div class="text-xl mb-4">Description</div>
              <div>{{ competition.description }}</div>
            </div>
            <div class="border-3 rounded-lg w-full p-6 bg-[#F0F0F0]">
              <div class="font-mono whitespace-nowrap text-xl mb-4">Skills Needed</div>
              <div class="flex gap-2 flex-grow flex-wrap">
                <span v-for="(skill, index) in competition.skills.split(', ')" :key="skill.name" :class="[
                  'px-4 py-1 rounded-full font-mono text-black border-3', colors[index % colors.length]]">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex-1 flex flex-col gap-y-4">
            <div class="border-3 rounded-lg w-full p-6 bg-[#F0F0F0]">
              <div class="space-y-4">
                <div class="font-mono">
                  <div class="text-gray-600">Date</div>
                  <div>{{ new Date(competition.date).toLocaleString('en-GB') }}</div>
                </div>
                <div class="font-mono">
                  <div class="text-gray-600">Team Size</div>
                  <div>{{ competition.capacity }} members</div>
                </div>
                <div class="font-mono">
                  <div class="text-gray-600">Link</div>
                  <a :href="competition.url" target="_blank" class="underline">{{ competition.url }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </StadiumCard>
  </template>