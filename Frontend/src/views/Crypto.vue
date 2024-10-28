<template>
    <navigationBar />
    <span>
        <RouterLink to="/dashboard">
            <img src="../assets/icons/thin-arrow.png" alt="" class="h-8 w-8 ml-5">
        </RouterLink>
    </span>
    <div class="flex flex-col items-center  h-screen ">
        <div class=" p-8 max-w-lg w-full">
            <h2 class="text-green-600 text-xl font-bold mb-6 text-center">Cryptocurrency</h2>

            <div class="mb-4 flex justify-center">
                <img src="../assets/icons/cryptocurrencies.png" alt="Crypto Icon" class="w-16 h-16" />
            </div>

            <p class="text-gray-700 text-sm text-center mb-4">
                Cryptocurrency is a digital or virtual currency that uses cryptography for security.
                It operates on a technology called blockchain, which ensures transparency and security in transactions.
            </p>
            <p class="text-gray-700 text-sm text-center mb-4">
                Cryptocurrencies have gained popularity due to their potential for high returns,
                as well as their use in decentralized finance (DeFi), enabling users to lend, borrow, and trade without
                intermediaries.
            </p>
            <p class="text-gray-700 text-sm text-center mb-4">
                However, investing in cryptocurrency comes with risks, including market volatility and regulatory
                challenges.
                Understanding these factors is crucial for anyone looking to invest or use cryptocurrencies.
            </p>

        </div>
    </div>
</template>

<script setup>
import navigationBar from '@/components/navigationBar.vue';
</script>
