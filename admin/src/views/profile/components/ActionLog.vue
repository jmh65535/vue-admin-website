<template>
  <div class="action-log-container">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) of list"
        :key="index"
        :timestamp="item.created_at"
        placement="top"
      >
        <el-card>
          <h4>{{ item.module }}-{{ item.action }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      background

      layout="total, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getLogs } from '@/api/log'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      data: [],
      list: [],
      pageSize: 4,
      // pageSizes: [4, 8, 16], // select选项设置：条/页
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['id'])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
    },
    getData() {
      getLogs(this.id).then((res) => {
        this.data = res.data
        this.total = this.data.length
        this.handleCurrentChange(this.currentPage)
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.list = this.data.slice((val - 1) * this.pageSize, val * this.pageSize)
    }
  }
}
</script>
