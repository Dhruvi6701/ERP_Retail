const router = require("express").Router(); // Import router object
const {connection} = require("../Config/sqldb"); // Import database connection
const moment = require("moment"); // Import moment module for fix format
let getData = require("../Middleware/rangeData"); // Import middleware for getData

// Get Total Purchase data
router.post("/totalpurchase", async (req, res) => {
  var sql =
    "select format(SUM(total_amount),0) as totalpurchase from fts_purchase_order_invoice_item_details WHERE created_date_time BETWEEN ? and  ?  ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

// Get Total Number of Purchase Product data
router.post("/totalproducts", async (req, res) => {
  var sql =
    "SELECT COUNT(product_id) as totalproducts FROM fts_purchase_order_invoice_item_details WHERE created_date_time BETWEEN ? and  ? ";
  let data = await getData(sql, req.body.sd, req.body.ed);
  res.send(await data);
});

// Get Total Discount Offered data
router.post("/totaldiscount", async (req, res) => {
  var sql =
    "SELECT FORMAT(SUM(discount),0) as totaldiscount FROM fts_purchase_order_invoice WHERE last_modified_date_time  BETWEEN ? and  ? ";
  let data = await getData(sql, req.body.sd, req.body.ed);
  res.send(await data);
});

// Get Total Tax Amount data
router.post("/totaltax", async (req, res) => {
  let sql =
    "SELECT FORMAT(SUM(total_tax),0) as totaltax FROM fts_purchase_order_invoice where  last_modified_date_time  BETWEEN ? and  ? ";
  let data = await getData(sql, req.body.sd, req.body.ed);
  res.send(await data);
});

// Get Due Amount data for Purchase Invoice
router.post("/dueamount", async (req, res) => {
  var sql =
    "SELECT Format(SUM(amount_due),0) as dueamount FROM fts_purchase_order_invoice where last_modified_date_time BETWEEN ? and  ?";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

// Get Due Invoice data for Purchase Product
router.post("/dueinvoice", async (req, res) => {
  var sql =
    "SELECT COUNT(id) as dueinvoice FROM fts_purchase_order_invoice WHERE amount_due>0 and last_modified_date_time BETWEEN ? and  ?";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

// Get Total Number of Generated Purchase Invoice data
router.post("/totalinvoice", async (req, res) => {
  var sql =
    "SELECT COUNT(id) as totalinvoice FROM fts_purchase_order_invoice WHERE invoice_date BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.get("/purchasechart", function (req, res) {
  var query =
    "SELECT SUM(total_amount) as amount,HOUR(created_date_time) as time from fts_purchase_order_invoice_item_details where TIME(HOUR(created_date_time)) BETWEEN '9' AND '20' GROUP BY TIME(HOUR(created_date_time)) ORDER BY SUM(total_amount) desc";
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.send(err);
    } else {
      formatData(rows);
      res.send(jsonArray);
    }
  });
});
function formatData(dataArray) {
  var amount = [];
  var time = [];
  for (var i = 0; i < dataArray.length; i++) {
    amount[i] = dataArray[i].amount;
    time[i] = dataArray[i].time;
  }
  jsonArray = [amount, time];
 
}
module.exports = router;