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
					<el-button type="primary" v-on:click="getUsers" size="medium"><i class="el-icon-search"></i> 查询</el-button>
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
							<el-input v-model="filters.name" placeholder="批签发" size="medium"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="filters.name" placeholder="编号" size="medium"></el-input>
						</el-form-item>
						
						<el-form-item>
							<el-button type="primary" @click="handleAdd" size="medium"><i class="el-icon-plus"></i> 新增</el-button>
						</el-form-item>
					</el-form>
				  </div>
				</div>
			</el-collapse-transition>
		</el-col>

		<!--列表-->
		<el-table :data="users" stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="80" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="80" sortable>
			</el-table-column>
			<el-table-column prop="birth" label="日期" width="150" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column  fixed="right" label="操作" width="310">
				<template scope="scope">
					<router-link to="/Comment" class="el-button el-button--default el-button--small">查看</router-link>
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="warning" size="small" @click="handleShuttle(true)">设置权限</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--底部工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
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

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		
		<!--穿梭框-->
		<el-dialog title="权限设置" :visible.sync="shuttleVisible" :close-on-click-modal="false">
		<el-transfer v-model="shuttle" :data="data" :titles="['系统权限', '已拥有权限']" @change="handleChange"></el-transfer>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="shuttleVisible = false">取消</el-button>
				<el-button type="primary" @click.native="handleShuttle" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog> 
		
		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog> 
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				data: [],
				shuttle: [],
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
				listLoading: false,
				buttonLoading: false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				shuttleVisible: false,//穿梭框是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}
			}
		},
		methods: {
			//未选择性别时，性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleSizeChange(val) {
				this.limit = val;
				this.getUsers();
			},
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
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//加载穿梭框
			handleShuttle(type) {
				//穿梭框
				const generateData = _ => {
					const data = [];
					for (let i = 1; i <= 15; i++) {
					  data.push({
						key: i,
						label: `权限 ${ i }`
					  });
					}
					return data;
				};
				this.data = generateData();
				this.shuttle = [1];
				this.shuttleVisible = type;
		    },
			//穿梭框的change操作获取数据
			handleChange(value, direction, movedKeys) {
				console.log(value, direction, movedKeys);
		    },
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

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
	　　　　}
		},
		mounted() {
			this.getUsers();
			this.handleShuttle(false);
		}
	}
</script>

<style scoped>
.transition-box {
    height: 50px;
    box-sizing: border-box;
  }
</style>