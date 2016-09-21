.DEFAULT_GOAL := help

HOST   ?= localhost
PORT   ?= 9091

webpack-dev-server = ./node_modules/.bin/webpack-dev-server
webpack-dashboard = ./node_modules/.bin/webpack-dashboard

.PHONY: install-deps
install-deps: init ## install all development dependencies

.PHONY: init
init: ## all init tasks (deps and template resolv)
	npm install

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

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
