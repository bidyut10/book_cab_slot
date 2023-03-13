const connection = require("../database/db");

const SlotPost = async function (req, res) {
  try {
    
    const { date, startSlotTime, endSlotTime } = req.body;

    //Req Body is empty or not
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        status: false,
        error: "Please Provide Your Slot Details",
      });
    }

    //checking every required feilds
    if (!date || !startSlotTime || !endSlotTime) {
      return res
        .status(400)
        .send({ status: false, error: "Something Missing" });
    }

    //checking the time format using regex
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(startSlotTime) || !timeRegex.test(endSlotTime)) {
      return res.status(400).json({ error: "Invalid Time Format" });
    }

    // hours should be in between (0-23) and minutes (0-59)
    const [startHours, startMinutes] = startSlotTime.split(":");
    const [endHours, endMinutes] = endSlotTime.split(":");

    if (
      startHours < 0 ||
      startHours > 23 ||
      endHours < 0 ||
      endHours > 23 ||
      startMinutes < 0 ||
      startMinutes > 59 ||
      endMinutes < 0 ||
      endMinutes > 59
    ) {
      return res.status(400).json({ error: "Invalid Time Range" });
    }

    if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date)) {
      return res.status(400).send({
        status: false,
        error: `Date should be in "YYYY-MM-DD" format`,
      });
    }

    // Checking the existing slot
    connection.query(
      `SELECT * FROM slots WHERE date = '${date}' AND ((startSlotTime >= '${startSlotTime}' AND startSlotTime < '${endSlotTime}') OR (endSlotTime > '${startSlotTime}' AND endSlotTime <= '${endSlotTime}'))`,
      function (err, results) {
        if (err) throw err;

        //if exist, than sending an error msg
        if (results.length > 0) {
          res
            .status(400)
            .send({
              status: false,
              error: "This Slot is already Booked, Try another Slot",
            });
        } else {
          //if not, than creating the slot
          connection.query(
            `INSERT INTO slots (date, startSlotTime, endSlotTime) VALUES ('${date}', '${startSlotTime}', '${endSlotTime}')`,
            function (err, results) {
              if (err) throw err;
              res
                .status(201)
                .send({ status: true, message: "Slot Booked Successfully" });
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
