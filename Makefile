.DEFAULT_GOAL := help

HOST   ?= localhost
PORT   ?= 9091

webpack-dev-server = ./node_modules/.bin/webpack-dev-server
webpack-dashboard = ./node_modules/.bin/webpack-dashboard

.PHONY: install-deps
install-deps: init ## install all development dependencies

.PHONY: init
init: ## all init tasks (deps and template resolv)
init: init_configs
	npm install

.PHONY: init_configs ## initialize templated config files
init_configs: config/Config.js

config/Config.js:
	cp config/Config.js.template config/Config.js

.PHONY: check
check: check-lint check-static ## perform all check tasks

.PHONY: check-lint
check-lint: ## perform linting with automatic fixes
	"node_modules/.bin/eslint_d" --parser babel-eslint --fix src/ config/

.PHONY: check-static
check-static: ## perform static analysis
	"node_modules/.bin/flow"

.PHONY: run
run: ## start development server
	$(webpack-dashboard) -- $(webpack-dev-server) --host ${HOST} --port ${PORT} --hot --inline --content-base public/ \
	  --history-api-fallback --display-error-details

.PHONY: build
build:
	NODE_ENV=production ./node_modules/.bin/webpack --progress -p

.PHONY: deploy
deploy:
	rsync -avP public/* uberspace:www/lindendata.tinkatinka.com/

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
