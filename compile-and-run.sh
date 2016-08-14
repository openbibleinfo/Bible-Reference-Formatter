flow check flow/osisFormatter.js
flow suggest flow/osisFormatter.js
flow coverage flow/osisFormatter.js
babel flow/osisFormatter.js --out-file=./es6/osisFormatter.js
node es6/osisFormatter.js

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

mkdir es5
babel flow/osisFormatter.js --out-file=./es5/osisFormatter.js --no-babelrc --presets=es2015 --plugins="transform-flow-strip-types"
babel flow/paratextToOsis.js --out-file=./es5/paratextToOsis.js --no-babelrc --presets=es2015 --plugins="transform-flow-strip-types"
babel flow/en.js --out-file=./es5/en.js --no-babelrc --presets=es2015 --plugins="transform-flow-strip-types"
babel flow/osisToParatext.js --out-file=./es5/osisToParatext.js --no-babelrc --presets=es2015 --plugins="transform-flow-strip-types"

webpack --optimize-minimize --output-library=OsisFormatter es5/osisFormatter.js js/osisFormatter.js
webpack --optimize-minimize --output-library=paratextToOsis es5/paratextToOsis.js js/paratextToOsis.js
# Leave it unminimized so that it's easy to remove formats you don't want.
webpack --output-library=osisToEn es5/en.js js/en.js
webpack --optimize-minimize --output-library=osisToParatext es5/osisToParatext.js js/osisToParatext.js
rm es5/*
rmdir es5

cd test/lang
node make-languages.js
cd ../..
istanbul cover jasmine-node test/
