bin = ./node_modules/.bin
pkg = lib node_modules

test: $(pkg) node_modules/recurly.js
	@npx jest --detectOpenHandles --forceExit
test-debug: $(pkg)
	@node --inspect-brk $(bin)/jest --runInBand --detectOpenHandles
test-watch: $(pkg)
	@npx jest --detectOpenHandles --watchAll
test-types: $(pkg)
	@npx dtslint types --expectOnly

docs: $(pkg)
	@npx storybook dev -p 6006 -c docs/.storybook/
docs-build: $(pkg)
	@npx storybook build -c docs/.storybook/ -o build/docs
docs-publish-remote:
	@curl \
		--header "Authorization: token $(GITHUB_TOKEN)" \
		--request POST \
		--data '{"event_type": "docs_publish"}' \
	  https://api.github.com/repos/recurly/react-recurly/dispatches

publish: lib clean node_modules
	@npm publish --access public

node_modules: package.json
	@npm install
node_modules/recurly.js:
ifdef RECURLY_JS_SHA
	@npm i git://github.com/recurly/recurly-js.git#$(RECURLY_JS_SHA)
endif

clean:
	@rm -rf build lib-dist node_modules
	@rm README.md

.PHONY: test test-debug test-watch test-types
.PHONY: docs docs-build docs-publish-remote
.PHONY: publish clean
