<template>
  <el-container class="fm-container">
    <el-main class="fm-main">
      <div class="headline"><span>用户管理</span></div>
      <div class="toolTab">
        <el-form :inline="true" class="demo-form-inline" size="mini">
          <el-form-item>
            <el-form-item>
              <el-input placeholder="请输入搜索关键字" prefix-icon="el-icon-search"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="addData('dialogFormData')">新增</el-button>
            <!-- <el-button type="warning" icon="el-icon-edit-outline">修改</el-button> -->
            <el-button type="danger" icon="el-icon-delete" @click="allDeleteForm()">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableList">
        <el-table
          v-loading="loading"
          height="100%"
          ref="tableList"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
          style="width: 100%"
          stripe
          @selection-change="handleSelectionChange">
          <el-table-column
            type="index"
            width="40"
            fixed
            >
          </el-table-column>
          <el-table-column
            type="selection"
            width="30"
            fixed
            >
          </el-table-column>
          <el-table-column
            prop="username"
            label="登录帐号"
            fixed
            width="100"
            >
          </el-table-column>
          <el-table-column
            prop="realname"
            label="用户名称"
            fixed
            width="120"
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
            prop="workNo"
            label="员工工号"
            fixed
            >
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="所属部门"
            fixed
            >
          </el-table-column>
          <el-table-column
            prop="sexName"
            label="性别"
            >
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="生日"
            width="140"
            >
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            >
          </el-table-column>
          <el-table-column
            prop="qq"
            label="QQ"
            >
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="联系电话"
            width="120"
            >
          </el-table-column>
          <el-table-column
            prop="sendStateName"
            label="短信发送状态"
            width="120"
            >
          </el-table-column>
          <el-table-column
            prop="isDeleteName"
            label="是否删除"
            width="120"
            >
          </el-table-column>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-view"
                type="text"
                size="mini"
                @click="detailTable(scope.$index, scope.row)"
                >查看详情</el-button>
              <el-button
                icon="el-icon-edit"
                type="text"
                size="mini"
                @click="editForm(scope.$index, scope.row)">编辑</el-button>
              <el-button
                icon="el-icon-delete"
                type="text"
                size="mini"
                @click="deleteForm(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total=parseInt(tableData.length)>
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      loading:true,
      /* tree数据 */
      filterText: '',
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      /* tree数据 */

      /* 表格数据 */
      tableData: [],
      multipleSelection: [],
      /* 表格数据 */
      /* 分页 */
      currentPage: 0,
      pagesize: 10,
      /* 分页 */

      /* 弹框显示 */
      dialogFormVisible: false,
      dialogDetailVisible: false,
      isEdit: '', // 判断是新增或是编辑
      editIndex: 0,
      selectionDate: null,
      /* 弹框数据 */
      btnLoading: false,
      dialogFormData: {
        date: '',
        name: '',
        address: '',
        idDelet: ''
      },
      rules: {}// 表单验证规则
    }
  },
  created () {
    /* 获取表格数据 */
    this.$http.get('/api/sysUser').then(resp => {
      this.tableData = resp.data.data[0].rows
      this.loading = false
    }).catch(resp => {
      console.log(resp)
    })
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.isDelet === value
    },
    // 获取多选数据
    handleSelectionChange (val) {
      let _this = this
      _this.multipleSelection = val
      _this.selectionDate = val
    },
    // 新增
    addData (dialogFormData) {
      let _this = this
      _this.isEdit = false

      /* 清除验证 */
      if (_this.$refs[dialogFormData]) {
        _this.$refs[dialogFormData].clearValidate()
      }

      _this.dialogFormVisible = true
      _this.dialogFormData.date = ''
      _this.dialogFormData.name = ''
      _this.dialogFormData.address = ''
      _this.dialogFormData.isDelet = ''
    },
    // 查看详情
    detailTable (index, row) {
      let _this = this
      _this.dialogDetailVisible = true
    },
    // 编辑
    editForm (index, row) {
      let _this = this
      _this.isEdit = true
      _this.editIndex = index

      _this.dialogFormVisible = true
      _this.dialogFormData.date = row.date
      _this.dialogFormData.name = row.name
      _this.dialogFormData.address = row.address
      _this.dialogFormData.isDelet = row.isDelet
    },
    // 保存
    saveForm (dialogFormData) {
      let _this = this
      _this.btnLoading = true
      let params = {
        date: _this.dialogFormData.date,
        name: _this.dialogFormData.name,
        address: _this.dialogFormData.address,
        isDelet: _this.dialogFormData.isDelet
      }
      _this.$refs[dialogFormData].validate((valid) => {
        if (valid) {
          if (_this.isEdit) { // 编辑
            _this.tableData.splice(_this.editIndex, 1, params)
            _this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else { // 添加
            _this.tableData.push(params)
            _this.$message({
              message: '添加成功',
              type: 'success'
            })
          }
          _this.dialogFormVisible = false
        } else {
          this.$message.error('验证失败')
          return false
        }
      })
      _this.btnLoading = false
    },
    // 删除
    deleteForm (index, item) {
      let _this = this
      _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.tableData.splice(index, 1)
        _this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    // 批量删除
    allDeleteForm () {
      let _this = this
      if (_this.selectionDate) {
        console.log(_this.selectionDate)
        /* _this.$message({
          type: 'success',
          message: '批量删除成功!'
        }) */
      } else {
        this.$message.error('没有选择要删除的数据哦！')
      }
    },
    /* table */
    /* 分页 */
    handleSizeChange (val) {
      this.pagesize = val
      console.log(val)
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
    /* 分页 */
  }
}
</script>

<style lang="less" scoped>

</style>
