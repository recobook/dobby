build:
	docker build -t dobby:latest .
	docker tag dobby:latest recobook/dobby:latest
push:
	docker image push recobook/dobby:latest
release: build push