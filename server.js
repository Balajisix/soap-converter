const express = require("express");
const fs = require("fs");
const path = require("path");
const soap = require("soap");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors({
  origin: "https://balajisix.github.io",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'SOAPAction']
}));

const service = {
  CaseInversionService: {
    CaseInversionServiceSoapPort: {
      invertCase: function (args) {
        const input = args.input;
        const inverted = input
          .split("")
          .map((char) =>
            char === char.toUpperCase()
              ? char.toLowerCase()
              : char.toUpperCase()
          )
          .join("");
        return { result: inverted };
      },
    },
  },
};

const wsdlPath = path.join(__dirname, "caseService.wsdl");
const xml = fs.readFileSync(wsdlPath, "utf8");

app.listen(PORT, () => {
  soap.listen(app, "/wsdl", service, xml);
  console.log(`SOAP server running at ${PORT}`);
});

module.exports = app;