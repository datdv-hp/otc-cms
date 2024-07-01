<script lang="ts" setup>
import { notifyError, notifySuccess, translateYupError } from '@/common/helper';
import { IUserRefundItemInForm } from '../type.js';
import { UseUserStore } from '../store.js';
import { ChainType, RefundConfigFormSchema } from '../constant.js';
import { userApiService } from '../api.js';
import { toUserRefundFormDTO } from '../helper.js';
import { IOption } from '@/common/type.js';

const { t } = useI18n();
const store = UseUserStore();

const { errors, handleSubmit, isSubmitting, resetForm } = useForm<{
  refunds: IUserRefundItemInForm[];
}>({ validationSchema: RefundConfigFormSchema });
const refundConfigs = reactive(useFieldArray<IUserRefundItemInForm>('refunds'));
const refundOptions = ref<IOption[]>([]);

async function fetch() {
  try {
    store.setIsLoadingRefundDialog(true);
    if (store.refundDialog.userId) {
      await store.getUserRefund(store.refundDialog.userId);
    }
    resetForm({
      values: {
        refunds: Object.values(ChainType).map((chainType) => {
          return {
            chainType,
            cashbackId: store.userRefundMapByChainType?.[chainType]?.cashbackId as number
          };
        })
      }
    });
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  } finally {
    store.setIsLoadingRefundDialog(false);
  }
}

const submit = handleSubmit(async (values) => {
  try {
    const res = await userApiService.bulkUpdateRefundByUser(
      store.refundDialog.userId,
      toUserRefundFormDTO(values.refunds)
    );
    if (res.success) {
      notifySuccess(t('user.success.updateRefundConfig'));
      store.closeRefundDialog();
    } else {
      notifyError(t('user.error.updateRefundConfig'));
    }
  } catch (error) {
    notifyError(t('common.error.somethingWrong'));
  }
});

onMounted(async () => {
  fetch();
});
</script>
<template>
  <v-dialog :model-value="true" max-width="600" min-width="350px">
    <v-card
      class="py-2"
      prepend-icon="$sidebar.admin"
      :title="t('user.title.userRefundConfiguration')"
      :loading="store.refundDialog.isLoading"
    >
      <v-card-text>
        <v-row dense>
          <v-col cols="12" v-for="field in refundConfigs.fields" :key="field.key">
            <v-select
              v-model="field.value.cashbackId"
              :hide-spin-buttons="true"
              :items="refundOptions"
              :label="t(`user.chainType.${field.value.chainType}`)"
              hide-details="auto"
              :error="!!errors[`refunds.${field.key}.cashbackId` as any]"
              :error-messages="translateYupError(errors[`refunds.${field.key}.cashbackId` as any])"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="px-6">
        <v-spacer></v-spacer>
        <v-btn
          width="90"
          :text="t('common.button.close')"
          variant="plain"
          @click="store.closeRefundDialog"
        ></v-btn>
        <v-btn
          color="primary"
          width="90"
          :text="t('common.button.save')"
          variant="tonal"
          :loading="isSubmitting"
          @click="submit"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="scss" scoped></style>
