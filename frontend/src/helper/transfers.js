export const transferMonth = (obj) => {
  const result = [];
  const element = {};
  const array = Object.keys(obj).reverse();
  console.log(array);
  array.forEach((item) => {
    switch (item.slice(-2)) {
      case "01":
        result.push({ name: "January", Total: parseInt(obj[item]) });
        break;
      case "02":
        result.push({ name: "February", Total: parseInt(obj[item]) });
        break;
      case "03":
        result.push({ name: "March", Total: parseInt(obj[item]) });
        break;
      case "04":
        result.push({ name: "April", Total: parseInt(obj[item]) });
        break;
      case "05":
        result.push({ name: "May", Total: parseInt(obj[item]) });
        break;
      case "06":
        result.push({ name: "June", Total: parseInt(obj[item]) });
        break;
      case "07":
        result.push({ name: "July", Total: parseInt(obj[item]) });
        break;
      case "08":
        result.push({ name: "August", Total: parseInt(obj[item]) });
        break;
      case "09":
        result.push({ name: "September", Total: parseInt(obj[item]) });
        break;
      case "10":
        result.push({ name: "October", Total: parseInt(obj[item]) });
        break;
      case "11":
        result.push({ name: "November", Total: parseInt(obj[item]) });
        break;
      case "12":
        result.push({ name: "December", Total: parseInt(obj[item]) });
        break;
      default:
        break;
    }
  });
  return result;
};
