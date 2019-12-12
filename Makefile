BIN = ./node_modules/.bin
WEBPACK = $(BIN)/webpack
SERVER = $(BIN)/webpack-dev-server --inline --hot --port 8040
SRC = $(shell find . -type f -name '*.js' ! -path './build/*' -o -name '*.css' ! -path './build/*')

server: build
ifdef RECURLY_JS_CERT
	@$(SERVER) --https --cert $(RECURLY_JS_CERT) --key $(RECURLY_JS_KEY) --display-error-details
else
	@$(SERVER) --https
endif

build: demo

test:
	@npm test

demo: lib
	@$(WEBPACK) --display-reasons --display-chunks

lib: $(SRC) node_modules
	@$(WEBPACK) --display-reasons --display-chunks --config webpack.prod.config.js

node_modules: package.json
	@npm install

clean:
	@rm -rf node_modules build

.PHONY: test server clean
