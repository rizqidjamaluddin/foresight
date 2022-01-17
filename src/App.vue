<template>
    <div id="app">
        <div class="toolbar">
            <router-link to="/" class="link">Home</router-link>
            <router-link to="/about" class="link">About</router-link>
        </div>
        <router-view/>
    </div>
</template>
<style scoped lang="css">
#app {
    @apply relative min-h-screen;
}

.toolbar {
    @apply border-b border-gray-300 text-sm flex sticky top-0 bg-white px-2;
    z-index: 1;
}

.link {
    @apply py-2 px-4 font-bold text-gray-700;
}

.link:hover {
    @apply text-blue-800 underline;
    text-decoration-color: theme('colors.blue.300');
    text-decoration-thickness: 2px;
}
</style>
