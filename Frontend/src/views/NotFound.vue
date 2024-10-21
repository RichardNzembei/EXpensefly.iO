<template>
    <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <router-link to="/login">Go back to login</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}
</style>