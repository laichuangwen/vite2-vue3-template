<template>
    <div :class="s.view">
        <div :class="s.wrapper">
            <p>{{$t('Login')}}</p>
            <el-button type="primary"
                @click="$router.push('forget')">跳转forget</el-button>

            <el-button type="primary"
                @click="$router.push('register')">跳转register</el-button>
            <el-button type="primary"
                @click="handleLang('zh')">切换zh语言</el-button>
            <el-button type="primary"
                @click="handleLang('en')">切换en语言</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    methods: {
        handleLang(lang) {
            this.$store.dispatch('user/config/update', {
                key: 'lang',
                value: lang
            })
        },
        // 请求接口
        async submit() {
            try {
                const auth = await this.$api.post('/api/app-user/auth-by-password', {
                    ...this.form,
                    username: this.$utils.AES.Encrypt(this.form.username),
                    password: this.$utils.AES.Encrypt(this.form.password)
                })
            } catch (error) {
                console.error(error);
            }
        },
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
