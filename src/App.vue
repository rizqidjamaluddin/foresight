<template>
    <div id="app">
        <div class="toolbar">
            <router-link to="/" class="link">Home</router-link>
            <router-link to="/about" class="link">About</router-link>
        </div>
        <router-view/>
        <div class="status-bar">
            100%
        </div>
    </div>
</template>

<style scoped lang="css">
#app {
    @apply grid inset-0 relative h-screen;
    grid-template-rows: auto 1fr auto;
}

.toolbar {
    @apply border-b border-gray-300 text-sm flex gap-2;
}

.link {
    @apply p-2 underline decoration-sky-500;
}

.link:hover {
    @apply text-blue-800;
}

.status-bar {
    @apply border-t border-gray-300 p-2 text-sm;
}
</style>
