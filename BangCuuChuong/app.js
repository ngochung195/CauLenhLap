let sout, i, j;
sout = "<table border='1' width='900' cellspacing='0' cellpadding='3'>"
i = j = 1;
while (i <= 10) {
    sout += "<tr>";
    while (j <= 10) {
        sout += `<td>${j} * ${i} = ${j * i}</td>`;
        j++;
    }
    i++;
    j = 1;
    sout += "</tr>";
}
sout += "</table>";
document.write(sout);
