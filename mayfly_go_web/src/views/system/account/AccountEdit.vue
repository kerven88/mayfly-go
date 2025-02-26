<template>
    <div class="account-dialog">
        <el-dialog :title="title" v-model="dialogVisible" :before-close="cancel" :show-close="false" width="35%" :destroy-on-close="true">
            <el-form :model="form" ref="accountForm" :rules="rules" label-width="auto">
                <el-form-item prop="name" label="姓名:" required>
                    <el-input v-model.trim="form.name" placeholder="请输入姓名" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="username" label="用户名:" required>
                    <el-input :disabled="edit" v-model.trim="form.username" placeholder="请输入账号用户名，密码默认与账号名一致" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="edit" prop="password" label="密码:">
                    <el-input type="password" v-model.trim="form.password" placeholder="输入密码可修改用户密码" autocomplete="new-password"></el-input>
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cancel()">取 消</el-button>
                    <el-button type="primary" :loading="btnLoading" @click="btnOk">确 定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { toRefs, reactive, watch, ref } from 'vue';
import { accountApi } from '../api';
import { ElMessage } from 'element-plus';

const props = defineProps({
    visible: {
        type: Boolean,
    },
    account: {
        type: [Boolean, Object],
    },
    title: {
        type: String,
    },
});

//定义事件
const emit = defineEmits(['update:visible', 'cancel', 'val-change']);

const accountForm: any = ref(null);

const rules = {
    name: [
        {
            required: true,
            message: '请输入姓名',
            trigger: ['change', 'blur'],
        },
    ],
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: ['change', 'blur'],
        },
    ],
};

const state = reactive({
    dialogVisible: false,
    edit: false,
    form: {
        id: null,
        name: null,
        username: null,
        password: null,
        repassword: null,
    },
    btnLoading: false,
});

const { dialogVisible, edit, form, btnLoading } = toRefs(state);

watch(props, (newValue: any) => {
    if (newValue.account) {
        state.form = { ...newValue.account };
        state.edit = true;
    } else {
        state.edit = false;
        state.form = {} as any;
    }
    state.dialogVisible = newValue.visible;
});

const btnOk = async () => {
    accountForm.value.validate((valid: boolean) => {
        if (valid) {
            accountApi.save.request(state.form).then(() => {
                ElMessage.success('操作成功');
                emit('val-change', state.form);
                state.btnLoading = true;
                setTimeout(() => {
                    state.btnLoading = false;
                }, 1000);
                //重置表单域
                accountForm.value.resetFields();
                state.form = {} as any;
            });
        } else {
            ElMessage.error('表单填写有误');
            return false;
        }
    });
};

const cancel = () => {
    emit('update:visible', false);
    emit('cancel');
};
</script>
<style lang="scss"></style>
