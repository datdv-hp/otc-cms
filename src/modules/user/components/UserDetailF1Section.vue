<script lang="ts" setup>
const { t } = useI18n();
</script>
<template>
  <v-expansion-panels :elevation="1">
    <v-expansion-panel :title="t('user.section.f1Title')">
      <template #text>
        <v-row>
          <v-col sm="6">
            <v-row>
              <v-col></v-col>
            </v-row>
          </v-col>
          <v-col sm="6">
            <v-row>
              <v-col></v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<style lang="scss" scoped></style>
