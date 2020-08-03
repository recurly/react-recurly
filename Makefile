bin = ./node_modules/.bin
jest = $(bin)/jest
coveralls = $(bin)/coveralls
pkg = lib node_modules

test: $(pkg)
ifdef RECURLY_JS_SHA
	npm i git://github.com/recurly/recurly-js.git#$(RECURLY_JS_SHA)
endif
	@npm test
test-debug: $(pkg)
	@node --inspect-brk $(jest) --runInBand --forceExit
test-watch: $(pkg)
	@npm test -- --watchAll
test-types: $(pkg)
	@npm run test:types

test-ci: test-cov-ci
test-cov-ci: test
	@cat ./build/reports/coverage/lcov.info | $(coveralls)

docs: $(pkg)
	@npm run storybook
docs-build: $(pkg)
	@npm run build-storybook
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

clean:
	@rm -rf build lib-dist node_modules

.PHONY: clean publish test test-ci test-debug docs docs-build docs-deploy test-types test-ci test-cov-ci
