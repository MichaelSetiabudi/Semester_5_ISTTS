const convertDate = (dateString) =>{
  return dateString.toISOString().substring(0,10)
}
export default convertDate