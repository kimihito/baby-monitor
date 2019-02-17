<template>
  <b-container>
    <b-form-row>
      <b-col>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            label="Password :"
            label-for="exampleInput1"
            description="We'll never share your email with anyone else."
            :invalid-feedback="invalidFeedback"
            :state="state"
          >
            <b-form-input
              id="exampleInput1"
              v-model="form.password"
              type="password"
              required
              :state="state"
              placeholder="パスワードを入力"
              @input="onInput"
            />
          </b-form-group>
          <b-button type="submit" variant="primary">
            送信
          </b-button>
          <b-button type="reset" variant="danger">
            リセット
          </b-button>
        </b-form>
      </b-col>
    </b-form-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        password: null
      },
      errorMessage: null
    }
  },

  computed: {
    invalidFeedback() {
      if (!this.form.password) {
        return ''
      } else {
        return this.errorMessage ? this.errorMessage : ''
      }
    },

    state() {
      if (!this.errorMessage || !this.form.password) return null
      return !this.errorMessage
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.errorMessage = null
      try {
        this.$store.dispatch('verifyPassword', this.form.password)
        this.$router.push('/')
      } catch {
        this.errorMessage = '認証に失敗しました'
      }
    },

    onReset(event) {
      event.preventDefault()
      this.form.password = null
      this.errorMessage = null
    },

    onInput() {
      if (!this.form.password) {
        this.errorMessage = null
      }
    }
  }
}
</script>
