<template>
  <div></div>
</template>

<script>
import service from "@/services/service.js";

export default {
  data() {
    return {
      condiciones: [],
    };
  },
  async beforeMount() {
    const response = await service.get(
      `conditions/services-options?service_id=${this.$route.params.id}`
    );
    this.conditions = response.data;
    this.condiciones = this.conditions[0].condiciones;

    if (this.condiciones != 0) {
      this.$router.push({ name: "ConditionsEdit" });
    } else {
      this.$router.push({ name: "ConditionsCreate" });
    }
  },
  methods: {},
};
</script>