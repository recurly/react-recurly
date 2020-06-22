BIN = ./node_modules/.bin
PKG = lib node_modules

test: $(PKG)
	@npm test
test-debug: $(PKG)
	@node --inspect-brk node_modules/.bin/jest --runInBand --forceExit
test-watch: $(PKG)
	@npm test -- --watchAll
test-types: $(PKG)
	@npm run test:types

docs: $(PKG)
	@npm run storybook
docs-build: $(PKG)
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

.PHONY: clean publish test test-ci test-debug docs docs-build docs-deploy test-types
