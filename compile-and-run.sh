flow check flow/osisToParatext.js
flow suggest flow/osisToParatext.js
flow coverage flow/osisToParatext.js
babel flow/osisToParatext.js --out-file=./es6/osisToParatext.js
node es6/osisToParatext.js

flow check flow/paratextToOsis.js
flow suggest flow/paratextToOsis.js
flow coverage flow/paratextToOsis.js
babel flow/paratextToOsis.js --out-file=./es6/paratextToOsis.js
node es6/paratextToOsis.js

#jasmine-node test
istanbul cover jasmine-node test/
