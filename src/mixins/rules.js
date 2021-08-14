export default {
  data: () => ({
    rules: {
      required: v => (v !== '' && v !== undefined && v != null) || 'Required field'
    },
  })
}
