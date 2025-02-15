<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const competitions = ref([
  {
    id: 1,
    title: 'Hackathon 2025 LF SWE Groupmate!',
    postedBy: 'Tony Stuck',
    description: 'Hello, I\'m looking for a group mate to join a group of 3 by May 2025. This is for hackathon....',
    skills: [
      { name: 'Presentation', color: 'bg-pink-400' },
      { name: 'UI/UX', color: 'bg-green-300' }
    ]
  },
  {
    id: 2,
    title: 'Hackathon 2025 LF SWE Groupmate!',
    postedBy: 'Steve Rojak',
    description: 'Hi! Interested to join a group of 4 members for next month\'s Hackathon?..............',
    skills: [
      { name: 'Tailwind', color: 'bg-cyan-300' },
      { name: 'UI/UX', color: 'bg-green-300' }
    ]
  }
])

const filteredCompetitions = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return competitions.value

  return competitions.value.filter(comp =>
    comp.title.toLowerCase().includes(query) ||
    comp.description.toLowerCase().includes(query) ||
    comp.skills.some(skill => skill.name.toLowerCase().includes(query))
  )
})
</script>

<template>
  <StadiumCard>
    <div class="relative mb-6 bg-[#F0F0F0]">
      <input type="text" v-model="searchQuery" placeholder="Search for your ideal competition"
        class="w-full p-4 pr-12 rounded-lg border-2 border-black font-mono text-xl" />
      <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Competition Listings -->
    <div class="space-y-4">
      <div v-for="competition in filteredCompetitions" :key="competition.id"
        class="bg-[#F0F0F0] rounded-lg border-2 border-black p-6 cursor-pointer hover:bg-gray-50 transition-colors">
        <div class="flex justify-between items-start">
          <div class="space-y-4 flex-1">
            <h2 class="font-mono text-2xl">{{ competition.title }}</h2>
            <div class="text-gray-600 italic">
              posted by {{ competition.postedBy }}
            </div>
            <p class="font-mono">{{ competition.description }}</p>

            <!-- Skills -->
            <div class="flex items-center gap-2">
              <span class="font-mono">Skills Needed:</span>
              <div class="flex gap-2">
                <span v-for="skill in competition.skills" :key="skill.name" :class="[
                  skill.color,
                  'px-4 py-1 rounded-full font-mono text-black'
                ]">
                  {{ skill.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <div class="text-4xl">→</div>
        </div>
      </div>
    </div>
  </StadiumCard>
</template>