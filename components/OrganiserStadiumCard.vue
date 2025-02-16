<script setup>
const upcomingItems = ref([
  {
    id: 1,
    title: 'Donor Meeting',
    date: '3 March 2025',
    time: '10:30 AM',
    location: 'Zoom'
  },
  {
    id: 2,
    title: 'Team A Bonding',
    date: '5 March 2025',
    time: '12:00 AM',
    location: 'Chinatown Point Mcdonalds'
  },
  {
    id: 3,
    title: 'Management Meeting',
    date: '10 March 2025',
    time: '10:00 AM',
    location: 'GeeksHacking Secret Lair'
  }
])
const eventTimeline = ref([
    {
        id:6,
        time: '10:30AM',
        description:'Registration'
    },   
     {
        id:7,
        time: '11:00AM',
        description:'Introduction'
    },    {
        id:8,
        time: '11:15AM',
        description:'Ice-breakers'
    },    {
        id:9,
        time: '11:30AM',
        description:'Briefing'
    },    {
        id:10,
        time: '12:00PM',
        description:'Lunch'
    }
])
const sponsorImageLinks = ref([
    { id: 11, link: '/assets/img/sponsor_1.png' },
    { id: 12, link: '/assets/img/sponsor_2.png' },
    { id: 13, link: '/assets/img/sponsor_3.png' },
    { id: 14, link: '/assets/img/sponsor_4.png' },
    { id: 15, link: '/assets/img/sponsor_5.png' },
    { id: 16, link: '/assets/img/sponsor_6.png' },
    { id: 17, link: '/assets/img/sponsor_7.png' },
    { id: 18, link: '/assets/img/sponsor_8.png' }
])
const colors = ['bg-linear-[90deg,#FFB7EE,#FFFFFF]','bg-linear-[90deg,#78B6F5,#FFFFFF]', 'bg-linear-[90deg,#FFB235,#FFFFFF]']; // Define your colors

const emit = defineEmits(['close'])
</script>

<template>
    <StadiumCard left-title="May 2025 Hackathon Overview" right-title="Current Session: Lead Organiser">
        <div class="flex w-full h-full gap-2">
            <div class="flex-col flex gap-y-2 flex-3 w-full h-full">
                <div class="w-full border-3 rounded-lg flex-1 flex flex-row items-center">
                    <div class="flex-1 text-center text-2xl font-bold bg-[#78B6F5] h-full content-center">
                        View Teams
                    </div>
                    <div class="border-l-3 h-full">
                    </div>
                    <div class="flex-3 text-center text-2xl">
                        90/120 participants
                    </div>
                </div>
                <div class="w-full border-3 rounded-lg flex-1 flex flex-row items-center">
                    <div class="flex-1 text-center text-2xl font-bold  bg-[#78B6F5] h-full content-center">
                        View Shifts
                    </div>
                    <div class="border-l-3 h-full">
                    </div>
                    <div class="flex-3 text-center text-2xl">
                        Your team: Team A
                    </div>
                </div>
                <div class="w-full flex-6 flex flex-row gap-x-2 ">
                    <div class="w-1/2 h-full flex flex-col border-3 rounded-lg items-center bg-[#D34848] overflow-scroll">
                        <div class="flex-1 text-center flex items-center text-2xl font-bold">
                            Event Details
                        </div>
                        <div class="border-t-3 w-full">
                        </div>
                        <div class="flex-8 text-left self-start p-2 bg-white w-full overflow-scroll">
                            <span class="font-bold">17-18 May 2025</span>
                            <p class="mb-">
                                Rakuten Asia, 138 Market St, #20-01 CapitaGreen, Singapore <b>048946</b>
                            </p>
                            <p class="underline font-bold my-2">Timeline:</p>
                            <div class="flex flex-col p-1" v-for="(timeline, index) in eventTimeline" :key="timeline.id">
                                <div :class="[colors[index%colors.length], 'p-4', 'font-mono', 'text-lg', 'rounded-lg']">
                                    <div class="flex-1 flex flex-row justify-between">
                                        <div class="flex-1 text-start text-sm">{{ timeline.time }}</div>
                                        <div class="flex-1 text-end text-sm">{{ timeline.description }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2  border-3 rounded-lg h-full flex flex-col items-center bg-[#D34848]">
                        <div class="flex-1 text-center flex items-center text-2xl font-bold">
                            Funding Details
                        </div>
                        <div class="border-t-3 w-full">
                        </div>
                        <div class="flex-8 text-left self-start p-2  bg-white w-full">
                            <p class="font-bold">Total Budget: $8000 / 10,000</p>
                            <p class="underline font-bold my-2">Sponsors:</p>
                                <div class="grid grid-cols-2 gap-4 justify-between">
                                    <img src="../assets/img/sponsor_1.png">
                                    <img src="../assets/img/sponsor_2.png">
                                    <img src="../assets/img/sponsor_3.png">
                                    <img src="../assets/img/sponsor_4.png">
                                    <img src="../assets/img/sponsor_5.png">
                                    <img src="../assets/img/sponsor_6.png">
                                </div>
                            <!-- <div class="flex flex-col p-1" v-for="(image, index) in sponsorImageLinks" :key="image.id">
                                <img :src="`${image.link}`" :alt="'Sponsor ' + (index + 1)" class="rounded-lg shadow-lg">
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 w-full border-3 h-full  rounded-lg overflow-hidden">
                <div class="flex-1 text-center text-2xl p-1 bg-[#D34848] font-bold">
                    Upcoming
                </div>
                <div class="flex-8  border-t-3 text-center h-full overflow-auto">
                    <div class="flex flex-col p-2 mt-1" v-for="(upcoming, index) in upcomingItems" :key="upcoming.id">
                        <div :class="[colors[index%colors.length], 'p-4', 'font-mono', 'text-lg', 'rounded-lg']">
                            <div class="flex-1 flex flex-row justify-between">
                                <div class="flex-1 text-start">{{ upcoming.date }}</div>
                                <div class="flex-1 text-end">{{ upcoming.time }}</div>
                            </div>
                            <div class="flex-1 text-left">
                                {{ upcoming.title }}
                            </div>
                            <div class="flex-1 italic text-xs text-left mt-2">
                                {{ upcoming.location }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StadiumCard>
</template>
