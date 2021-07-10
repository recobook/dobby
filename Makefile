build:
	docker build -t dobby:latest .
	docker tag dobby:latest recobook/dobby:latest
publish:
	docker image push recobook/dobby:latest
