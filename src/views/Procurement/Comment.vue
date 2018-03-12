<template>
	<section>
		<!--顶部工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="单位" size="medium"></el-input>
				</el-form-item>
				<el-form-item>
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
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers" size="medium" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
				<el-dropdown trigger="click">
				  <el-button type="primary" size="medium" :loading="buttonLoading">
					导出<i class="el-icon-sort-down el-icon--right"></i>
				  </el-button>
				  <el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="export2Excel">EXCEL</el-dropdown-item>
					<el-dropdown-item>PDF</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
				</el-form-item>
				<el-form-item>
				<el-dropdown trigger="click">
				  <el-button type="primary" size="medium" :loading="buttonLoading">
					打印<i class="el-icon-printer el-icon--right"></i>
				  </el-button>
				  <el-dropdown-menu slot="dropdown">
					<el-dropdown-item>打印模板1</el-dropdown-item>
					<el-dropdown-item>打印模板2</el-dropdown-item>
					<el-dropdown-item>打印模板3</el-dropdown-item>
					<el-dropdown-item>打印模板4</el-dropdown-item>
					<el-dropdown-item>打印模板5</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
				</el-form-item>
				<el-form-item>
				<el-button size="medium" @click="isCollapse = !isCollapse">展开</el-button>
				</el-form-item>
			</el-form>
			
			<!--折叠工具条-->
			 <el-collapse-transition>
				<div v-show="isCollapse">
				  <div class="transition-box">
					<el-form :inline="true" :model="filters">
						<el-form-item>
							<el-input placeholder="批签发" size="medium"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input placeholder="编号" size="medium"></el-input>
						</el-form-item>
					</el-form>
				  </div>
				</div>
			</el-collapse-transition>
		</el-col>

		<!--列表-->
		<el-table :data="users" stripe highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="权限" width="80" sortable>
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="80" sortable>
			</el-table-column>
			<el-table-column prop="birth" label="日期" width="150" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column  fixed="right" label="操作" width="180">
				<template scope="scope">
					<el-button type="primary" size="small" @click="open(scope.$index, scope.row)">查看</el-button>
					<router-link to="/Upload" class="el-button el-button--default el-button--small" @click.native="handleUpload">上传文件</router-link>
				</template>
			</el-table-column>
		</el-table>

		<!--底部工具条-->
		<el-col :span="24" class="toolbar">
			<!--分页-->
			<el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :current-page="currentPage4"
			  :page-sizes="[20, 50, 100]"
			  :page-size="limit"
			  layout="total, sizes, prev, pager, next, jumper"
			  :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
		<!--上传弹出层-->
		<el-dialog title="上传" :visible.sync="UploadFormVisible" :close-on-click-modal="false" :before-close="back">
			<router-view></router-view>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="back">取消</el-button>
				<el-button type="primary">提交</el-button>
			</div>
		</el-dialog>
		
		<!--调用右侧dialog组件-->
		<z-dialog :show.sync="show" v-bind:parentToChild="parentMsg"><s-dialog slot="html" v-bind:parentToChild="parentId"></s-dialog></z-dialog>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import ZDialog from '@/components/Lw_RDialog'
	import SDialog from '../nav1/Table'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				data: [],
				datePicker: [],//日期选择器
				isCollapse: false,//折叠工具条
				currentPage4: 1,
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				limit: 20,
				UploadFormVisible: false,
				listLoading: false,
				buttonLoading: false,
				img: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
				show: false,
				parentMsg: {
					title: "详情",
					data: '',
					vShow: false //是否显示按钮
				},//给dialog组件传递值
				parentId: ""
			}
		},
		methods: {
			//返回上一层路由
			back(){
				this.UploadFormVisible = false;
				this.$router.go(-1);//返回上一层
			},
			//分页工具栏
			handleSizeChange(val) {
				this.limit = val;
				this.getUsers();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//显示上传界面
			handleUpload: function (index, row) {
				this.UploadFormVisible = true;
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name,
					limit: this.limit
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//导出excel
			export2Excel() {
				this.buttonLoading = true;
	　　　　　　require.ensure([], () => {
	　　　　　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
	　　　　　　　　const tHeader = ['序号', 'IMSI', 'MSISDN', '证件号码', '姓名'];
	　　　　　　　　const filterVal = ['name', 'sex', 'age', 'birth', 'addr'];
	　　　　　　　　//const list = this.users;	//导出页面table当前页的数据
	　　　　　　　　const list = [{name: "qqq",sex: "aaa",age: "sa","birth": "ds" ,addr: "ww"}];	//自定义导出数据
	　　　　　　　　const data = this.formatJson(filterVal, list);
	　　　　　　　　export_json_to_excel(tHeader, data, '列表excel');
					this.buttonLoading = false;
	　　　　　　});
	　　　　},
	　　　　formatJson(filterVal, jsonData) {
	　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
	　　　　},
			//打开dialog
			open (index, row) {
				this.parentId = index;
                this.show = true;
				let obj = Object.assign({}, row);
				this.parentMsg.data = '<el-card class="box-card"><div class="text item">姓名：'+obj.name+'</div><div class="text item">地址：'+obj.addr+'</div><div class="text item">生日：'+obj.birth+'</div><div class="text item">编号：'+obj.id+'</div><div class="text item">年龄：'+obj.age+'</div><div class="text item">其他：'+obj.sex+'</div></el-card>';
            }
		},
		mounted() {
			this.getUsers();
		},
        components: {
            ZDialog,SDialog
        }
	}
</script>

<style scoped>
.transition-box {
    height: 50px;
    box-sizing: border-box;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
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