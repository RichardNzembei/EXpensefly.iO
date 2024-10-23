<script setup>
import { ref } from 'vue';
import articleCard from '@/components/articleCard.vue';
import navigationBar from '@/components/navigationBar.vue';

const articles = ref([
    {
        title: 'Understanding Money Management',
        content: 'Money management is the process of budgeting, saving, investing, spending, or otherwise overseeing the capital usage of an individual or group. Effective money management can help you to meet your financial goals, such as having a stable income or a secure retirement.',
    },
    {
        title: 'Best Practices for Budgeting',
        content: 'Creating a budget is one of the best ways to take control of your finances. Start by tracking your income and expenses. Then categorize your expenses into fixed and variable costs to identify areas for savings.',
    },
    {
        title: 'Investing Basics',
        content: 'Investing is the act of allocating resources, usually money, in order to generate income or profit. Understanding the different types of investments—stocks, bonds, mutual funds, and real estate—can help you build a diversified portfolio that suits your financial goals.',
    },
]);
</script>
<template>
    <navigationBar />
    <div class="educational-section p-6 bg-gray-50">
        <span class="inline">
            <RouterLink to="/dashboard"> <img src="../assets/icons/thin-arrow.png" alt="home image"
                    class="h-8 w-8  ml-2"></RouterLink>
            <h1 class="text-center text-3xl font-bold mb-8 text-gray-800">Money Mechanics</h1>
        </span>
        <div class="articles-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <articleCard v-for="article in articles" :key="article.title" :title="article.title"
                :content="article.content" />
        </div>
    </div>
</template>