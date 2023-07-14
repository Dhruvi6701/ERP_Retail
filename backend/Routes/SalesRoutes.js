const router = require("express").Router();
const {connection} = require("../Config/sqldb");
const moment = require("moment");
let getData = require("../Middleware/rangeData")

// For store chart data in array
function formatData(dataArray) {
  var amount=[];
  var time=[]
    for(var i = 0; i < dataArray.length; i++) {
      console.log(" in format data amount" + dataArray[i].amount)
      amount[i] = dataArray[i].amount;
     time[i] = dataArray[i].time;
     // gdp[i] = dataArray[i].transaction_type;
    }
    jsonArray = [amount, time];
    console.log("in FormatData()...\n");
    console.log(jsonArray);
  }

// Get Total Sales data
router.post("/totalsale", async (req, res) => {
  let sql = `SELECT Format(SUM(invoice_total),0) AS totalsales FROM fts_invoice WHERE invoice_date BETWEEN ? and  ? and is_paid=1 `;
  res.send(await getData(sql, req.body.sd, req.body.ed));
});
router.post("/totalproducts", async (req, res) => {
  var sql =
    "SELECT COUNT(invoice_item_id)as totalproducts FROM fts_itemable WHERE created_date_time BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});
router.post("/totalproducts",async(req,res)=>{
  var sql ="SELECT COUNT(invoice_item_id)as totalproducts FROM fts_itemable WHERE created_date_time BETWEEN ? and  ? "
  res.send(await getData(sql,req.body.sd ,req.body.ed));
})

// Get Due Invoice data for Sales Product
router.post("/dueinvoice", async (req, res) => {
  var sql =
    "SELECT COUNT(id) as dueinvoice from fts_invoice where amount_due>0 and invoice_date BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

// Get Total Number of Generated Sales Invoice
router.post("/totalinvoice", async (req, res) => {
  var sql =
    "SELECT COUNT(id) as totalinvoice FROM fts_invoice WHERE invoice_date BETWEEN ? and  ?  ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/totaldiscount", async (req, res)=> {
  var sql =
    "SELECT Format(sum(total_discount),0) as totaldiscount from fts_invoice,fts_clients c where c.userid=customer_id and invoice_date BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/dueamount",async (req, res) => {
  var sql = "select Format(SUM(amount_due),0) as dueamount from fts_invoice where invoice_date BETWEEN ? and  ? ";
  res.send(await getData(sql,req.body.sd ,req.body.ed));

});

router.post("/customerdue", async(req, res) => {
  var sql =
    "SELECT customer_id,amount_due,payment_type from fts_invoice where payment_type = 5 GROUP BY amount_due ORDER BY customer_id and  invoice_date BETWEEN ? and  ?  ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/totaltax", async(req, res) => {
  var sql =
    "SELECT FORMAT(SUM(total_tax_amount),0) as totaltax FROM fts_invoice where  invoice_date BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

router.post("/walletbalance", async (req, res) =>{
  var query =
    "SELECT Format(sum(total_balance),0) FROM 'fts_wallet' where last_modified_data  BETWEEN ? and  ? ";
  res.send(await getData(sql, req.body.sd, req.body.ed));
});

// Get average customer rating
router.post("/rating", function (req, res) {
  var query =
    "SELECT COUNT(average_rating) as averagerating from fts_ratings where DATE(last_modified_date_time) = CURDATE()";

  connection.query(query, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/totalstaff", async(req, res) => {
  var query =
    "SELECT COUNT(staffid),fts_staff.staffid,fts_roles.name from fts_staff INNER JOIN fts_roles on fts_roles.roleid = fts_staff.role GROUP BY role";

  connection.query(query, function (err, result) {
    if (err) {
      throw err;
    } else {
      let data = JSON.parse(JSON.stringify(result));

      res.send(result);
    }
  });
});
router.get("/saleschart",function(req,res){
  var query = "SELECT HOUR(invoice_date) as time,SUM(invoice_total) as amount from fts_invoice WHERE invoice_date BETWEEN '2022-01-04' AND '2022-11-02' GROUP BY HOUR(invoice_date)";
  console.log("In router")

  connection.query(query,function(err,rows,fields){
      if(err)
      {
          res.send(err);
      }
      else{
        console.log(rows)
          formatData(rows);
          res.send(jsonArray);
      }
  })
  // res.render('index.html');
  });
 
module.exports = router;