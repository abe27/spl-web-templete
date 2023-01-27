const DateTime = (dte) => {
  let d = new Date(dte);
  return `${d.getFullYear()}-${(
    "0" +
    (d.getMonth() + 1)
  ).slice(-2)}-${("0" + d.getDate()).slice(-2)} ${("0" + d.getHours()).slice(
    -2
  )}:${("0" + d.getMinutes()).slice(-2)}`;
};

const DateOnly = (dte) => {
  let d = new Date(dte);
  return `${d.getFullYear()}-${(
    "0" +
    (d.getMonth() + 1)
  ).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
};

const ReceiveStatus = (n) => {
  let status = [
    { name: "Success", class: "text-green-600" },
    { name: "In Progress", class: "text-red-700" },
    { name: "Cancel", class: "text-gray-600" },
    { name: "Error", class: "text-rose-800" },
    { name: "New", class: "text-blue-700" },
    { name: "Update", class: "text-indigo-600" },
  ];
  return status[n]
}

export {
  DateTime,
  DateOnly,
  ReceiveStatus
};
