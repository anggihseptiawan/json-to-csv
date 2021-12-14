import { UsersTypes } from "../types/User";

function convertToCSV(objArray: string) {
  const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      if (line != "") line += ";";

      line += array[i][index];
    }

    str += line + "\r\n";
  }
  return str;
}

export function generateCsv(
  headers: UsersTypes,
  items: UsersTypes[],
  fileTitle: string
) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  const jsonObject: string = JSON.stringify(items);

  const csv = convertToCSV(jsonObject);

  const exportedFilenmae = fileTitle + ".csv" || "export.csv";

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", exportedFilenmae);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
