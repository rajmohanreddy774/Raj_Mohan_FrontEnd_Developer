const authenticateUser = async (req, res, next) => {
  try {
    if (true) {
      next();
    } else {
      return res.status(401).send();
    }
  } catch (error) {
    return res
      .status(500)
      .send({ msg: "something is wrong" });
  }
};
module.exports = authenticateUser;
