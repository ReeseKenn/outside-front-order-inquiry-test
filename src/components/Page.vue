<template>
  <div class="query-page">
    <h3>Order inquiry</h3>
    <el-input
      clearable
      style="width:500px;border-radius:0"
      v-model="no"
      @keyup.enter.native="query"
      placeholder="Please enter the PO NO.(Order NO.) for enquiry"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="query"
        :loading="pageLoading"
      ></el-button>
    </el-input>
    <div class="resultTable" v-if="result.id">
      <el-table class="table1" :data="[result]" border>
        <el-table-column label="Odd No" prop="prefix_site_order_no" />
        <el-table-column label="Main order No" prop="order_no" />
        <el-table-column label="Customer" prop="customer_name" />
        <el-table-column label="Email of Customer" prop="email" />
        <el-table-column label="Date for Order" prop="order_created_at" />
        <el-table-column label="Quantity" prop="required_num" />
        <el-table-column
          label="Order status"
          prop="order_status.en_for_translator"
        />
        <el-table-column
          label="Payment status"
          prop="payment_status.en_for_translator"
        />
        <el-table-column
          label="Shipment status"
          prop="delivery_status.en_for_translator"
        />
      </el-table>
      <el-table class="table2" size="mini" :data="result.sub_orders" border>
        <el-table-column label="Picture" width="80">
          <template slot-scope="{ row }">
            <el-image
              v-if="row.product_child && row.product_child.image"
              :src="row.product_child.image"
              :preview-src-list="[row.product_child.image]"
            />
            <span v-else>No Picture</span>
          </template>
        </el-table-column>
        <el-table-column label="Sub Order No" prop="sub_order_no" />
        <el-table-column
          label="Order Status"
          prop="sub_order_status.en_for_translator"
        />
        <el-table-column
          label="Shipment Status"
          prop="sub_order_ship_status.en_for_translator"
        />
        <el-table-column label="Shipping Date" prop="ship_time" />
        <el-table-column label="Issued Quantity" prop="actual_num" />
        <el-table-column label="Colour" prop="product_child.color.en_name" />
        <el-table-column label="Size" prop="product_child.size.name" />
        <el-table-column label="Urgent type">
          <template slot-scope="{ row }">
            <span v-if="row.is_urgent === 1">Urgent</span>
            <span v-else>Ordinary</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Logistics Company"
          prop="logistics_info.express_code"
        />
        <el-table-column
          label="Logistics tracing No"
          prop="logistics_info.logistics_no"
        />
      </el-table>
    </div>
    <div v-else style="width:100%;margin:0 auto;text-align:center">
      <img src="../assets/noData.png" style="margin:0 auto;" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Page",
  props: {
    msg: String
  },
  data() {
    return {
      no: "",
      pageLoading: false,
      result: {}
    };
  },
  methods: {
    query() {
      this.no = this.no.trim();
      this.result = {};
      if (!this.no) {
        return;
      }
      this.pageLoading = true;
      this.$http({
        method: "get",
        url: `api/search/${this.no}`
      })
        .then(res => {
          if (res && res.data && res.data.data) {
            this.$message({
              showClose: true,
              message: "success",
              type: "success"
            });
            this.result = res.data.data;
            this.pageLoading = false;
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error"
            });
            this.pageLoading = false;
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "error",
            type: "error"
          });
          this.pageLoading = false;
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resultTable {
  padding: 20px 0;
}
.query-page {
  padding: 10px;
}
.query-page .table1 ::v-deep .el-table__header th {
  background-color: #d7d7d7;
}
.query-page .table2 ::v-deep .el-table__header th {
  background-color: #f2f2f2;
}
.query-page ::v-deep .el-input__inner {
  border-radius: 0;
}
.query-page ::v-deep .el-input-group__append,
.el-input-group__prepend {
  border-radius: 0;
  background-color: #d9001b;
  color: white;
}
</style>
