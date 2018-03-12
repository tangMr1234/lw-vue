<template>
	<el-dialog v-bind:title="parentToChild.title" :visible.sync="visible" @close="$emit('update:show', false)" :show="show">
		
		
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="$emit('update:show', false)">取消</el-button>
			<el-button type="primary" @click.native="$emit('update:show', false)">提交</el-button>
		</div>
	</el-dialog>


</template>

<script>
    export default {
		name: 'child',
        data () {
            return {
                visible: this.show
            };
        },
        props:["parentToChild","show"],
        watch: {
            show () {
                this.visible = this.show;
            }
        },
		method: {
			show: {
                type: Boolean,
                default: false
            }
		}
    };
</script>
<style scoped>
	
</style>