<template>
	<el-dialog custom-class="el-dialog_new" v-bind:title="parentToChild.title" :visible.sync="visible" @close="$emit('update:show', false)" :show="show" :close-on-click-modal="false">
		<div v-html="parentToChild.data">
		{{parentToChild.data}}
		</div>
		
		<slot name="html"></slot>
		
		<div slot="footer" class="dialog-footer" v-show="parentToChild.vShow">
			<el-button @click.native="$emit('update:show', false)" >取消</el-button>
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
	.el-dialog__wrapper{ 
		left: auto;
		width: 50%;
	}
</style>
<style>
	.el-dialog_new{
		width: auto;
		margin: 0!important;
		min-height: 100vh;
	}
</style>