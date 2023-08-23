const sqlite3 = require("sqlite3")

const conexaoBanco = new sqlite3.Database("./banco/bancoAulaQuarta.db",
 sqlite3.OPEN_READWRITE,
 (err) => {
    if (err) {
        return console.log(err);
    }
});

module.exports = { conexaoBanco };
