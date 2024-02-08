const Notif = ({ message }) => {
  let style = {
    backgroundColor: "grey",
    color: "darkGreen",
    border: "5px solid green",
    padding: "10px",
    margin: "10px 40px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "25px",
  };

  if (message === "Name must be at least three characters long." || message === 'eg. 09-1234556 and 040-22334455 are valid phone numbers') {
    style.color = "darkRed";
    style.border = "5px solid red";
  }
  

  if (message == null) {
    return null;
  }
  return <div style={style}>{message}</div>;
};

export default Notif;
