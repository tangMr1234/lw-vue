<template>
  <el-search-table-pagination
    type="local"
    :data="tableData"
    :page-sizes="[5, 10]"
    :columns="columns"
    :form-options="formOptions" stripe>
		<!-- 扩展checkbox -->
		<el-table-column slot="prepend" type="selection" width="55"> </el-table-column>
		<el-table-column slot="prepend" type="index" width="60"> </el-table-column>
		<!-- 扩展按钮 -->
		<el-table-column slot="append" label="操作" fixed="right" width="310">
			<template scope="scope">
				<el-button type="" size="small">查看</el-button>
				<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
				<el-button type="warning" size="small">编辑</el-button>
				<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
			</template>
		</el-table-column>		
  </el-search-table-pagination>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
  export default {
    data() {
      return {
        formOptions: {
          inline: true,
          submitBtnText: '查询',
		  fuzzy: true, //设置模糊搜索
		  size: 'medium',
          forms: [
            { prop: 'name', label: '', placeholder:"请输入姓名" },
            { prop: 'age', label: '', placeholder:"请输入年龄" },
            { prop: 'sex', label: '', itemType: 'select',
              options: [
                { value: '', label: '请选择性别' },
                { value: 0, label: '男' },
                { value: 1, label: '女' }
              ]
            }
          ]
        },
        columns: [
          { prop: 'name', label: '姓名', width: 120, sortable: true },
          { prop: 'sex', label: '性别', width: 80, sortable: true,
            render: row => {
              const { sex } = row
              return sex === 0 ? '男' : sex === 1 ? '女' : '未知'
            }
          },
          { prop: 'age', label: '年龄', width: 80, sortable: true },
          { prop: 'birth', label: '日期', width: 150, sortable: true },
          { prop: 'addr', label: '地址', width: 180, sortable: true }
        ],
        tableData: [ ]
      }
    },
	methods: {
		//获取用户列表
		getUsers() {
			let para = {
				page: 1,
				name: "",
				limit: 100
			};
			getUserListPage(para).then((res) => {
				this.tableData = res.data.users;
			});
		},
		//修改
		handleEdit: function (index, row) {
			console.log(index);
			console.log(row);
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
		}
	},
	mounted() {
		this.getUsers();
	}
  }
</script>