<script setup>
import navigationBar from '@/components/navigationBar.vue';
</script>
<template>
    <navigationBar />
    <div class="">
        <h1>Savings</h1>
        <p>View your current savings and manage your finances efficiently.</p>
        <form>
            <div class="mb-3">
                <label for="savingsMethod" class="">Savings Method:</label>
                <select class="form-select">
                    <option disabled value="mode of saving">mode of saving</option>
                    <option value="M-Shwari">M-Shwari</option>
                    <option value="Bank">Bank</option>
                    <option value="Crypto">Crypto</option>
                    <option value="SMMEs">SMMEs</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="savingsDate" class="">Date:</label>
                <input type="date" class="" required>
            </div>
            <div class="mb-3">
                <label for="savingsAmount" class="">Amount:</label>
                <input type="number" class="" placeholder="Enter amount" required>
            </div>
            <button type="submit" class="">Add Savings</button>
        </form>
        <div></div>
        <div></div>
    </div>


</template>