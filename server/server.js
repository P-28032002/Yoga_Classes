const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cron = require('node-cron');

app.use(express.static('public'))
app.use(express.json())

// parse application/json
app.use(bodyParser.json());
  
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'yoga_classes'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
 
//POST api to add new user
app.post('/userdata',(req, res) => {
    console.log('post request called.........');
    console.log(req.body.firstname);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let age = req.body.age;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let gender = req.body.gender;
    let batch_id = req.body.batchtime;
    var date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    var pay_id;
    let curr_date = year + "-" + month + "-" + day;
    console.log(curr_date);
    inputData_pay = {
      payment_date: curr_date,
      amount: 500,
      total_amount: 500,
      payment_monthly_status: 'Paid',
      email: email
    }

    inputData_participants = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      age: age,
      address: address,
      city: city,
      state: state,
      country: country,
      gender: gender,
      batch_id: batch_id,
      payment_id: pay_id,
      batch_changed: 1,
      batch_changed_date: curr_date
    }
    console.log(inputData_pay)
    console.log(inputData_participants)
    var sql='SELECT * FROM payments WHERE email =?';
    conn.query(sql, [email] ,function (err, data, fields) {
     if(err) throw err
     else{
      if(!data.length){
        //var sql = `INSERT INTO payments (pay_id, payment_date, amount, total_amount, payment_monthly_status, email) VALUES ("${1}","${payment_date}", "${inputData_pay.amount}", "${inputData_pay.total_amount}", "${inputData_pay.payment_monthly_status}", "${email}", NOW())`;;
        var sql = `INSERT INTO payments SET ?`
        conn.query(sql, [inputData_pay], function (err, data1) {
          console.log(data1);
          if (err) throw err;
          else{
            console.log('Success to insert the payment data'); 
            var sql = 'SELECT pay_id FROM payments where email=?'
            conn.query(sql, [inputData_pay.email], function (err, data2) {
              if (err)  throw err;
              else{
                inputData_participants.payment_id = data2[0].pay_id;
                console.log(inputData_participants.payment_id)
                console.log(inputData_participants.batch_id)
                var sql = 'INSERT INTO participants SET ?';
                conn.query(sql, [inputData_participants], function (err, data) {
                    if (err) throw err;
                    else{
                      console.log('Success to insert the participants data')  
                      res.status(200).json({message:"Welcome to Yoga Classes, Registration is done successfully"});
                    }
                });

              }
            });
          }
          });
      }
      else{
        var total_amount_present = data[0].total_amount + 500;
        console.log(total_amount_present)
        console.log(data[0].payment_date)
        var last_payment_month = data[0].payment_date.getMonth()+1;
        console.log(last_payment_month)
        if(month - last_payment_month>=1)
        {
        var sql2 = `UPDATE payments SET total_amount = ?, payment_monthly_status = ? where email=?`;
        conn.query(sql2, [total_amount_present,inputData_pay.payment_monthly_status,inputData_pay.email], function (err, data2) {
            if (err)  throw err;
            else{
              res.status(200).json({message:"You have successfully paid the fees of this month"});
            }
          });
        }
        else{
          res.status(400).json({message:"You already paid the fees of this month"});
        }
        }
      }
    })

})

//POST api to update batch time of the yoga class participants
app.post('/updatebatch',(req, res) => {
  let email = req.body.email;
  let batch_id = req.body.batchtime;
  var date_ob = new Date();
  let day = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let curr_date = year + "-" + month + "-" + day;

  var sql='SELECT * FROM participants WHERE email =?';
  conn.query(sql, [email] ,function (err, data, fields) {
   if(err) throw err
   else{
    if(!data.length)
    {
      console.log("Please register for Yoga Classes First!!")
      res.status(400).json({message:"Please register for Yoga Classes First!!"});
    }
    else{
      console.log(data[0])
      if(data[0].batch_changed == 1)
      {
        console.log("You're limit to change the batch has exceed i.e 1")
        res.status(400).json({message:"You're limit to change the batch has exceed i.e 1"})
      }
      else{
        var sql2 = `UPDATE participants SET batch_id = ?, batch_changed = ?, batch_changed_date = ? where email=?`;
        conn.query(sql2, [batch_id, 1,curr_date,email], function (err, data2) {
          if (err)  throw err;
          else{
            console.log('Batch Time updated!!');
            res.status(200).json({message:"Batch Time Updated successfully. Please enjoy your yoga class at your comfort :)"})
          }
        })
      }
    }
   }
  })
})

//Function to update the database at every first of the month so we can update the payment_monthly_status to 'Pending' and batch_changed
//field in participants table to 0
//We're doing this because at every start of the month the participants have to pay for the montly fees and he can can change the batch
//at any time on or after first day of the month but only one time.
//So we have to write code as cron.schedule('* * 1 * *', () => {}) to schedule the task for first day of the month
//But for testing purpose I have used cron.schedule('* * * * *', () => {}) to schedule the task for every single minute to make testing 
//comparitively easier
cron.schedule('* * 1 * *', () => {
  var sql2='SELECT * FROM participants';
  conn.query(sql2,function (err, data, fields) {
    for(var i = 0;i<data.length;i++){
    let email = data[i].email;
    var sql3 ='SELECT * FROM participants where email =?'
    conn.query(sql3, data[i].email,function (err, result, fields) {
      if(err) throw err
      else{
        var sql2 = `UPDATE participants SET batch_changed = ? where email=?`;
        conn.query(sql2, [0,email], function (err, data2) {
          if (err)  throw err;
          else{
            var sql2 = `UPDATE payments SET amount = ?, payment_monthly_status = ? where email=?`;
            conn.query(sql2, [0,'Pending',email], function (err, data2) {
              if (err)  throw err;
              else{
                  console.log("It's first day of the month and we have to update the database");
                }
            })
          }
        })
    }
     });
  }
})
});

app.listen(5000, () => { 
    console.log("Server started on port 5000") 
})