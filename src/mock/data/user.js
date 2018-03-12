import Mock from 'mockjs';
import axios from 'axios';
import user_logo from '@/assets/user.png';
import user_logo2 from '@/assets/logo.png';

// axios({
  // method:'get',
  // url:'http://apidev.pujiajia.com/v1/me?access=3f90f47f35b12363a0cd298275bd6e62&lw=pretty'
// }).then(function(res) {
	// var data = res.data.success;
    // data['entity']['name'];
// });

const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: user_logo,
    name: '超级管理员',
	power: "admin"
  },{
	id: 1,
    username: 'sq',
    password: '123456',
    avatar: user_logo2,
    name: '社区医院',
	power: "community"
  },{
	id: 1,
    username: 'jzd',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '接种点',
	power: "point"
  },{
	id: 1,
    username: 'other',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '其他用户',
	power: ""
  }
];

//生成的表格数据
const Users = [];
for (let i = 0; i < 150; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|1-60': 1,
    birth: Mock.Random.datetime('yyyy-MM-dd'),
    sex: Mock.Random.integer(0, 1)
  }));
} 
export { LoginUsers, Users };
