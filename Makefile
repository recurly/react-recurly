BIN = ./node_modules/.bin
WEBPACK = $(BIN)/webpack
SERVER = $(BIN)/webpack-dev-server --inline --hot --port 8040
SRC = $(shell find . -type f -name '*.js' ! -path './build/*' -o -name '*.css' ! -path './build/*')

demo: build
ifdef RECURLY_JS_CERT
	@$(SERVER) --https --cert $(RECURLY_JS_CERT) --key $(RECURLY_JS_KEY) --display-error-details
else
	@$(SERVER) --https
endif

build: $(SRC) node_modules
	@mkdir -p $(@D)
	@$(WEBPACK) --display-reasons --display-chunks

node_modules: package.json
	@npm install

clean:
	@rm -rf node_modules build

test:
	@npm test

.PHONY: test clean
