<script lang="ts" setup>
import SettingAwardTable from '../components/SettingAwardTable.vue';
const { t } = useI18n();
</script>
<template>
  <v-card>
    <v-card-title>
      <div class="d-flex align-center py-2">
        <span class="tp-title-sb"> {{ t('setting.title.listAward') }}</span>
        <v-spacer></v-spacer>
        <v-btn class="text-none" density="comfortable" flat color="primary">{{
          $t('common.button.add')
        }}</v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <SettingAwardTable />
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped></style>
