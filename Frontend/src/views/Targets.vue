<script setup>
import navigationBar from '@/components/navigationBar.vue';
</script>
<template>
    <navigationBar />

    <div class="">
        <h1>Targets</h1>
        <p>Set financial goals and track your progress towards achieving them.</p>
        <label for="emailInput" class="">Enter your Gmail address for reminders:</label>
        <input type="email" class="" placeholder="example@gmail.com" required>
        <form id="targetsForm">
            <div class="mb-3">
                <label for="targetDescription" class="">Description:</label>
                <input type="text" class="" placeholder="Enter description" required>
            </div>
            <div class="mb-3">
                <label for="targetAmount" class="">Target Amount:</label>
                <input type="number" class="" placeholder="Enter target amount" required>
            </div>
            <div class="mb-3">
                <label for="targetDeadline" class="">Deadline:</label>
                <input type="date" class="" required>
            </div>
            <button type="submit" class="">Set Target</button>
        </form>
        <div>
            <h2 class="mt-4">Undone Targets</h2>
            <div></div>
        </div>
        <div>
            <h2 class="mt-4">Done Targets</h2>
            <div></div>
        </div>
    </div>
</template>