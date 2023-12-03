<template>
  <div class="login">
    <a-row align="stretch" class="login-box">
      <a-col :xs="0" :sm="12" :md="13">
        <div class="login-left">
          <img class="login-img" src="@/assets/svgs/login-img.svg" alt="" />
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="11">
        <div class="login-right">
          <a-form
            ref="FormRef"
            size="large"
            :model="form"
            :rules="rules"
            :style="{ width: '84%' }"
            :label-col-style="{ display: 'none' }"
            :wrapper-col-style="{ flex: 1 }"
          >
            <h3 class="login-form-title">
              <img class="logo" src="@/assets/images/logo.svg" alt="" /><span>ContiNew Admin</span>
            </h3>
            <a-form-item field="username">
              <a-input v-model="form.username" placeholder="请输入用户名" allow-clear>
                <template #prefix><icon-user :stroke-width="1" :style="{ fontSize: '16px' }" /></template>
              </a-input>
            </a-form-item>
            <a-form-item field="password">
              <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear>
                <template #prefix><icon-lock :stroke-width="1" :style="{ fontSize: '16px' }" /></template>
              </a-input-password>
            </a-form-item>
            <a-form-item field="captcha" hide-label>
              <a-input
                v-model="form.captcha"
                placeholder="请输入验证码"
                :max-length="4"
                allow-clear
                style="flex: 1 1"
              >
                <template #prefix><icon-check-circle :stroke-width="1" :style="{ fontSize: '16px' }" /></template>
              </a-input>
              <img :src="captchaImgBase64" alt="验证码" class="captcha" @click="getCaptcha" />
            </a-form-item>
            <a-form-item>
              <a-row justify="space-between" align="center" class="w-full">
                <a-checkbox v-model="checked">记住密码</a-checkbox>
              </a-row>
            </a-form-item>
            <a-form-item>
              <a-space direction="vertical" fill class="w-full">
                <a-button type="primary" size="large" html-type="submit" long :loading="loading" @click="login"
                  >登录</a-button
                >
              </a-space>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>

    <GiThemeBtn class="theme-btn"></GiThemeBtn>

    <LoginBg></LoginBg>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { useLoading } from '@/hooks'
import { Message, type FormInstance } from '@arco-design/web-vue'
import LoginBg from './components/LoginBg/index.vue'
import { encryptByRsa } from '@/utils/encrypt'

defineOptions({ name: 'Login' })
const captchaImgBase64 = ref()
const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: 'admin',
  password: 'admin123',
  captcha: '',
  uuid: ''
})

const rules: FormInstance['rules'] = {
  username: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }],
  captcha: [{ required: true, message: '请输入验证码' }]
}

// 记住密码
const checked = ref(false)
// 登录加载
const { loading, setLoading } = useLoading()
const errorMessage = ref('')

const FormRef = ref<FormInstance>()

// 获取验证码
const getCaptcha = () => {
  userStore.getImageCaptcha().then((res) => {
    console.log(res.data.uuid)
    form.uuid = res.data.uuid
    captchaImgBase64.value = res.data.img
  })
}
getCaptcha()

// 点击登录
const login = async () => {
  try {
    const flag = await FormRef.value?.validate()
    if (flag) return
    setLoading(true)
    await userStore.login({
      username: form.username,
      password: encryptByRsa(form.password) || '',
      captcha: form.captcha,
      uuid: form.uuid
    })
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    router.push({
      path: (redirect as string) || '/',
      query: {
        ...othersQuery
      }
    })
    Message.success('登录成功')
  } catch (error) {
    getCaptcha()
    form.captcha = ''
    errorMessage.value = (error as Error).message
  } finally {
    setLoading(false)
  }
}
</script>

<style lang="scss" scoped>
.register-btn,
.register-btn:hover {
  color: var(--color-text-2);
}

.login-form-title {
  color: var(--color-text-1);
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    width: 32px;
    height: 32px;
    margin-right: 6px;
  }
}

.theme-btn {
  position: fixed;
  top: 20px;
  left: 30px;
  z-index: 9999;
}

.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-5);
  &-box {
    width: 86%;
    max-width: 820px;
    height: 480px;
    display: flex;
    z-index: 999;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.08);
  }
}

.login-left {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(60deg, rgb(var(--primary-6)), rgb(var(--primary-3)));
  .login-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.3s;
    object-fit: cover;
  }
}

.login-right {
  width: 100%;
  height: 100%;
  background: var(--color-bg-1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  box-sizing: border-box;
}

.captcha {
  width: 111px;
  height: 36px;
  margin: 0 0 0 5px;
  cursor: pointer;
}
</style>
