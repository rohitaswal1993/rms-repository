var db = require('../dbconnection');


var users = 
{
  

    issueAndUpdateStock:function(data, callback) 
  {     
      console.log("Rohit Inserting issued details");
    
    db.getConnection(function (err, connection) 
    {      
      if (err) throw err;
      connection.beginTransaction(function (err) 
      {
        if (err) {
          callback(err);
          throw err;
        }
        var query = "insert into ?? set ?";       
        connection.query(query, ['issued_details', data], function (error, result, fields) {
            if (err) {
                return connection.rollback(function () {
                  callback(err);
                  throw err;
                });
              }
              console.log("rohit Updating Stock_receive_mas")
          connection.query(`update stock_receive_mas set status_id=? where stock_id = '${data.stock_id}'`, [2], function (err, results) {
            if (err) {
              return connection.rollback(function () {
                callback(err);
                throw err;
              });
            }
            var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
            console.log("rohit inserting Stock_transaction_details")
            connection.query( "insert into stock_transaction_details set ? ",{stock_id:data.stock_id,transaction_date:CURRENT_TIMESTAMP,status:'2'}, function (error, result, fields) {
              if (err) {
                  return connection.rollback(function () {
                    callback(err);
                    throw err;
                    console.log(result.stock_id);
                  });
                }
            connection.commit(function (err) {
              if (err) {
                connection.rollback(function () {
                  callback(err);
                });
              }
              return callback(result);
            });
           });
          });
        });
      });
    });
  },

  //////////////////////////////////////////////// 

}//last bracket




module.exports = users;
// module.exports = returnedusers;










