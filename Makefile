BIN = ./node_modules/.bin

install-dev-deps:
	@echo "Installing development dependencies..."
	@npm install --dev

install-deps:
	@echo "Installing production dependencies..."
	@npm install

build: install-deps
	@echo "Building application artifacts..."
	@$(BIN)/webpack --progress

dev-server:
	@echo "Starting development server.."
	@./server


.PHONY: install-dev-deps install-deps build
