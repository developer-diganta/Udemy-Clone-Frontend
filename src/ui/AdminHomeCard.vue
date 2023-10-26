<template>
  <v-col cols="12" lg="4" style="margin: 10px">
    <v-card color="primaryTheme" variant="elevated">
      <v-card-item>
        <div>
          <div class="text-overline mb-1">
            {{ variant }}
          </div>
          <div class="text-h6 mb-1">
            {{ cardTitle }}
          </div>
          <div class="text-subtitle">
            {{ cardData }}
          </div>
        </div>
      </v-card-item>

      <v-card-actions style="margin-top: -15px">
        <v-btn> See Stat </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: ["cardTitle", "cardData"],
};
</script>
<style></style>
