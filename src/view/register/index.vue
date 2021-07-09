<template>
    <div :class="s.view">
        <div :class="s.wrapper">
            <p> register</p>
            <el-button type="primary"
                @click="$router.go(-1)">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
};
</script>

<style lang="scss" module="s">
.view {
    width: 100%;
    height: 100%;
    display: flex;
  justify-content: center;
    align-items: center;
    .wrapper {
    }
}
</style>
