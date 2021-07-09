<template>
    <router-view></router-view>
</template>


<script>
export default {
    name: 'App',
    created() {
        this.$nextTick(() => {
            // 删除加载
            const loading = document.getElementById("ready-loading-full")
            if (loading) {
                document.body.removeChild(loading);
            }
        })
    }
}
</script>