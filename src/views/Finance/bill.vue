<template>
	<section>
		<!--顶部工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<!--日期选择框-->
			<el-form :inline="true" :model="filters">
				<el-form-item label="日期:">
					<div class="block">
						<el-date-picker
						  v-model="datePicker"
						  type="datetimerange"
						  range-separator="至"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期" size="medium">
						</el-date-picker>
					  </div>
				</el-form-item>
				<!--搜索疫苗框-->
				<el-form-item label="疫苗:">
					<el-input v-model="filters.name" placeholder="请输入疫苗名称" size="medium"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers" size="medium" icon="el-icon-search">查看</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col>
			<el-row :gutter="20" style="margin-right:-20px;">
				<el-col class=" el-tabs--border-card clearfix">
					<!--左侧Menu-->
					<el-card class="box-card el-tabs__header" style="float:left">
					  <div v-for="o in 10" :key="o" class="text item el-tabs__item" :id="o" @click="tbsClick(o)" v-bind:class='{"is-active":o==tabsClass}'>
						<i v-bind:class='{"el-icon-caret-right":o==tabsClass}'></i> {{'单位：虹桥社区'+ o +' 金额：¥'+o+'000.00 日期：2017-11-1' + o }}
					  </div>
				    </el-card>
					<!--右侧表格-->
					<div style="overflow: hidden;">
						<el-col>
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-button size="small">收款登记</el-button>
									<el-button size="small" @click="batchCheck" :disabled="this.sels.length===0">审核</el-button>
								</div>
								<!--列表-->
								<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
									<el-table-column type="selection" fixed="left" width="40">
									</el-table-column>
									<el-table-column prop="birth" label="日期" width="100" sortable>
									</el-table-column>
									<el-table-column prop="name" label="疫苗" width="150">
									</el-table-column>
									<el-table-column prop="age" label="数量" width="80">
									</el-table-column>
									<el-table-column prop="age" label="单价" width="80" sortable>
									</el-table-column>
									<el-table-column prop="age" label="金额" min-width="100" sortable>
									</el-table-column>
									<el-table-column prop="age" label="结账单" min-width="150">
									</el-table-column>
									<el-table-column prop="age" label="收款单" min-width="150">
									</el-table-column>
									<el-table-column prop="age" label="单号" min-width="150">
									</el-table-column>
								</el-table>
								<!--底部工具条-->
								<el-col :span="24" class="mx15">
									<!--分页-->
									<el-pagination
									  @current-change="handleCurrentChange"
									  :current-page="currentPage4"
									  :page-sizes="[20, 50, 100]"
									  :page-size="limit"
									  layout="total, prev, pager, next"
									  :total="total" style="float:right;">
									</el-pagination>
								</el-col>
							</el-card>
						</el-col>
					</div>
				</el-col>
			</el-row>
		</el-col>
	</section>
</template>
<script>
	import util from '@/common/js/util'
	import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '@/api/api';

	export default {
		data() {
			return {
				data: [],
				datePicker: [],//日期选择器
				currentPage4: 1,
				filters: {
					name: ''
				},
				users: [],
				total: 20,
				page: 1,
				limit: 5,
				UploadFormVisible: false,
				listLoading: false,
				buttonLoading: false,
				show: false,
				sels: [],
				TableId: "",
				activeName2: "first",
				tabsClass: "1"
			}
		},
		methods: {
			selsChange: function (sels) {
				this.sels = sels;
			},
			//分页工具栏
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name,
					limit: this.limit
				};
				this.listLoading = true;
				NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					NProgress.done();
				});
			},
			//审核
			batchCheck: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认审核该账单？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						NProgress.done();
						this.$message({
							message: '审核成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//左侧menu点击事件
			tbsClick(id) {
				console.log(id);
				this.tabsClass = id; //设置点击active
				this.getUsers();
			}
		},
		mounted() {
			this.getUsers();
		},
        components: {
            
        }
	}
</script>
//scoped表示只在组件中使用该样式
<style scoped>
	.mx15{margin:15px 0;}
	.el-tabs--border-card { box-shadow:none; }
	.el-tabs--border-card, .el-tabs__item { border:none !important; }
	.el-tabs--border-card, .el-tabs__item, .el-tabs__header { background: none; }
	.el-tabs__item {display: block; padding: 0;}
	.el-tabs__item i {width: 15px;display: inline-block;}
	 
	.text {
		font-size: 14px;
	}
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both
	}
</style>