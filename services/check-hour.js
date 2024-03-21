export default function checkHour(req, res, next) {
  const date = new Date();
  const hour = date.getHours();

  if(hour < 8  || hour > 17) {
    return res.json({
      message: "Requisição inacessível neste horário"
    })
  }
  next()

}
