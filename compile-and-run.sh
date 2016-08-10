flow check flow/osisToReadable.js
flow suggest flow/osisToReadable.js
flow coverage flow/osisToReadable.js
babel flow/osisToReadable.js --out-file=./es6/osisToReadable.js
node es6/osisToReadable.js

flow check flow/paratextToOsis.js
flow suggest flow/paratextToOsis.js
flow coverage flow/paratextToOsis.js
babel flow/paratextToOsis.js --out-file=./es6/paratextToOsis.js
node es6/paratextToOsis.js

flow check flow/en.js
flow suggest flow/en.js
flow coverage flow/en.js
babel flow/en.js --out-file=./es6/en.js
node es6/en.js

flow check flow/osisToParatext.js
flow suggest flow/osisToParatext.js
flow coverage flow/osisToParatext.js
babel flow/osisToParatext.js --out-file=./es6/osisToParatext.js
node es6/osisToParatext.js

istanbul cover jasmine-node test/
