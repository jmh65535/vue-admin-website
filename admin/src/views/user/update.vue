<template>
  <user-form :prop-data="propData" />
</template>

<script>
import UserForm from './components/UserForm'
export default {
  name: 'UserUpdate',
  components: { UserForm },
  computed: {
    propData() {
      return this.$route.query.data
    }
  }
}
</script>
