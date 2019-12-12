BIN = ./node_modules/.bin
WEBPACK = $(BIN)/webpack
SERVER = $(BIN)/webpack-dev-server --inline --hot --port 8040

server: build
ifdef RECURLY_JS_CERT
	@$(SERVER) --https --cert $(RECURLY_JS_CERT) --key $(RECURLY_JS_KEY) --display-error-details
else
	@$(SERVER) --https
endif

build: build/demo.js
build/demo.js: demo lib node_modules
	@$(WEBPACK) --display-reasons --display-chunks

test:
	@npm test

publish: lib clean node_modules
	@npm publish --access public

node_modules: package.json
	@npm install

clean:
	@rm -rf node_modules build

.PHONY: clean publish server test
