const connection = require("../database/db");

const SlotPost = async function (req, res) {
  try {
      const { date, startSlotTime, endSlotTime } = req.body;

    // Checking the existing slot
    connection.query(
      `SELECT * FROM slots WHERE date = '${date}' AND ((startSlotTime >= '${startSlotTime}' AND startSlotTime < '${endSlotTime}') OR (endSlotTime > '${startSlotTime}' AND endSlotTime <= '${endSlotTime}'))`,
      function (err, results) {
        if (err) throw err;

        //if exist, than sending an error msg
        if (results.length > 0) {
          res.status(400).json({ error: "This Slot is already Booked, Try another Slot" });
        } else {
          
          //if not, than creating the slot
          connection.query(
            `INSERT INTO slots (date, startSlotTime, endSlotTime) VALUES ('${date}', '${startSlotTime}', '${endSlotTime}')`,
            function (err, results) {
              if (err) throw err;
              res.status(201).json({ message: "Slot Booked Successfully" });
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { SlotPost };
