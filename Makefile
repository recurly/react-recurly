test: lib node_modules
	@npm test
test-debug: lib node_modules
	@node --inspect-brk node_modules/.bin/jest --runInBand

publish: lib clean node_modules
	@npm publish --access public

node_modules: package.json
	@npm install

clean:
	@rm -rf build lib-dist node_modules

.PHONY: clean publish test-debug
